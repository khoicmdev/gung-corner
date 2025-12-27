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

  // Get the file URL
  const fileUrl = storage.getFilePreview(
    BUCKET_ID,
    result.$id,
    800, // width
    800, // height
    undefined, // gravity
    100 // quality
  );

  return fileUrl.toString();
}

// Delete image from Appwrite Storage
export async function deleteImage(fileId: string): Promise<void> {
  try {
    await storage.deleteFile(BUCKET_ID, fileId);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}
