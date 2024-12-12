import axios from "axios";

const apiClient = axios.create({
 baseURL: "https://tbr.otbbookings.co.za/wp-json/timetics/v1",
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
 const client = axios.create({
  baseURL: `${url}/wp-json/${version}/`,
  params: {
   consumer_key: consumerKey,
   consumer_secret: consumerSecret,
  },
 });

 return {
  get: (endpoint: string, params = {}) => client.get(endpoint, { params }),
  post: (endpoint: string, data = {}) => client.post(endpoint, data),
  put: (endpoint: string, data = {}) => client.put(endpoint, data),
  delete: (endpoint: string) => client.delete(endpoint),
 };
}

export const wooApiClient = createWooCommerceClient({
 url: "https://tbr.otbbookings.co.za",
 consumerKey: "ck_93323a7ddce3e987d380205d0723e5f1e19fde39",
 consumerSecret: "cs_7ea1903ed77a168b2670049db27a32ae855a8904",
});

export default apiClient;
