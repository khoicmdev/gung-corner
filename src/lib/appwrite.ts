import { Client, Databases, Storage, ID, Query } from "appwrite";

// Appwrite configuration
const client = new Client();

client
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject("69501d7d003850a1fcc4");

export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and collection IDs
export const DATABASE_ID = "69501e04001756ebc644";
export const PRODUCTS_COLLECTION_ID = "dessert";
export const BUCKET_ID = "69501da20003ee7759e2";

export { ID, Query };
export default client;
