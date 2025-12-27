import {
  databases,
  storage,
  DATABASE_ID,
  PRODUCTS_COLLECTION_ID,
  BUCKET_ID,
  ID,
  Query,
} from "./appwrite";
import { Product } from "@/types";

// Map Appwrite document to Product type
function mapDocToProduct(doc: Record<string, unknown>): Product {
  return {
    id: doc.$id as string,
    name: doc.name as string,
    description: (doc.description as string) || "",
    ingredients: (doc.ingredients as string) || "",
    price: doc.price as number,
    images: doc.image_url ? [doc.image_url as string] : [],
    category: (doc.category as string) || "",
    isBestSeller: (doc.isBestSeller as boolean) || false,
    createdAt: new Date(doc.$createdAt as string),
    updatedAt: new Date(doc.$updatedAt as string),
  };
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      [Query.orderDesc("$createdAt")]
    );

    return response.documents.map(mapDocToProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Get best seller products
export async function getBestSellers(): Promise<Product[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      [Query.equal("isBestSeller", true)]
    );

    return response.documents.map(mapDocToProduct);
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return [];
  }
}

// Get single product by ID
export async function getProduct(id: string): Promise<Product | null> {
  try {
    const doc = await databases.getDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      id
    );

    return mapDocToProduct(doc);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Create new product
export async function createProduct(
  product: Omit<Product, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const doc = await databases.createDocument(
    DATABASE_ID,
    PRODUCTS_COLLECTION_ID,
    ID.unique(),
    {
      name: product.name,
      description: product.description || null,
      ingredients: product.ingredients || null,
      price: product.price,
      image_url: product.images[0] || null,
      category: product.category,
      isBestSeller: product.isBestSeller || null,
      itemsSold: 0,
    }
  );
  return doc.$id;
}

// Update product
export async function updateProduct(
  id: string,
  product: Partial<Omit<Product, "id" | "createdAt">>
): Promise<void> {
  const updateData: Record<string, unknown> = {};

  if (product.name !== undefined) updateData.name = product.name;
  if (product.description !== undefined)
    updateData.description = product.description || null;
  if (product.ingredients !== undefined)
    updateData.ingredients = product.ingredients || null;
  if (product.price !== undefined) updateData.price = product.price;
  if (product.category !== undefined) updateData.category = product.category;
  if (product.isBestSeller !== undefined)
    updateData.isBestSeller = product.isBestSeller;
  if (product.images !== undefined)
    updateData.image_url = product.images[0] || null;

  await databases.updateDocument(
    DATABASE_ID,
    PRODUCTS_COLLECTION_ID,
    id,
    updateData
  );
}

// Delete product
export async function deleteProduct(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id);
}

// Upload image to Appwrite Storage
export async function uploadImage(file: File): Promise<string> {
  const result = await storage.createFile(BUCKET_ID, ID.unique(), file);

  // Get the project ID from the client config
  // We need to access the client configuration to get the project ID.
  // Since 'storage' is an instance of Storage, we can access the client from the imported 'client' instance in appwrite.ts
  // However, since we don't export 'client' directly, we can use the project ID from the environment or assume it's set.
  // Let's use the explicit Project ID we have or get it from env if possible, but for now we'll use the one defined in appwrite.ts implicitly or hardcode/pass it if needed.
  // Actually, we can import the client config or just use the hardcoded one since we know it.
  // But better: let's import the specific constant if available, or just use the string since the user provided it.
  // User provided: 69501d7d003850a1fcc4
  const projectId = "69501d7d003850a1fcc4"; // This should match NEXT_PUBLIC_APPWRITE_PROJECT_ID

  // Construct the URL manually as requested
  // https://sgp.cloud.appwrite.io/v1/storage/buckets/[bucketId]/files/[$id]/view?project=[projectId]&mode=admin
  const fileUrl = `https://sgp.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${result.$id}/view?project=${projectId}&mode=admin`;

  return fileUrl;
}

// Delete image from Appwrite Storage
export async function deleteImage(fileId: string): Promise<void> {
  try {
    await storage.deleteFile(BUCKET_ID, fileId);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}
