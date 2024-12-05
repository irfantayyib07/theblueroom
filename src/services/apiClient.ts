import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const apiClient = axios.create({
 baseURL: "https://tbr.otbbookings.co.za/wp-json/timetics/v1",
 timeout: 5000,
 headers: {
  "Content-Type": "application/json",
 },
});

interface WooCommerceConfig {
 url: string;
 consumerKey: string;
 consumerSecret: string;
 version?: string;
}

function createWooCommerceClient({ url, consumerKey, consumerSecret, version = "wc/v3" }: WooCommerceConfig) {
 // Generate OAuth 1.0a signature
 function generateOAuthParams() {
  return {
   oauth_consumer_key: consumerKey,
   oauth_nonce: uuidv4(),
   oauth_signature_method: "HMAC-SHA256",
   oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
   oauth_version: "1.0",
  };
 }

 function generateSignature(method: string, endpoint: string, params: Record<string, string>) {
  // Combine and sort all parameters
  const allParams: { [x: string]: string } = {
   ...generateOAuthParams(),
   ...params,
  };

  // Create parameter string
  const sortedParams = Object.keys(allParams)
   .sort()
   .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key])}`)
   .join("&");

  // Create signature base string
  const baseString = [
   method.toUpperCase(),
   encodeURIComponent(`${url}/wp-json/${version}/${endpoint}`),
   encodeURIComponent(sortedParams),
  ].join("&");

  // Generate signature
  const signature = CryptoJS.HmacSHA256(baseString, `${encodeURIComponent(consumerSecret)}&`);

  return CryptoJS.enc.Base64.stringify(signature);
 }

 // Create axios instance
 const client = axios.create({
  baseURL: `${url}/wp-json/${version}/`,
 });

 // Add request interceptor for OAuth
 client.interceptors.request.use(config => {
  const method = config.method?.toUpperCase() || "GET";
  const endpoint = config.url || "";

  // Prepare params
  const params = config.params || {};

  // Generate OAuth signature
  const oauthParams = generateOAuthParams();
  const signature = generateSignature(method, endpoint, params);

  // Add OAuth parameters to request
  config.params = {
   ...config.params,
   ...oauthParams,
   oauth_signature: signature,
  };

  return config;
 });

 return {
  get: (endpoint: string, params = {}) => client.get(endpoint, { params }),
  post: (endpoint: string, data = {}) => client.post(endpoint, data),
  put: (endpoint: string, data = {}) => client.put(endpoint, data),
 };
}

console.log(
 import.meta.env.VITE_WOOCOMMERCE_URL,
 import.meta.env.VITE_WOOCOMMERCE_CONSUMER_KEY,
 import.meta.env.VITE_WOOCOMMERCE_CONSUMER_SECRET,
);

export const wooApiClient = createWooCommerceClient({
 url: import.meta.env.VITE_WOOCOMMERCE_URL as string,
 consumerKey: import.meta.env.VITE_WOOCOMMERCE_CONSUMER_KEY as string,
 consumerSecret: import.meta.env.VITE_WOOCOMMERCE_CONSUMER_SECRET as string,
});

export default apiClient;
