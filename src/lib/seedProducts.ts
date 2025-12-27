import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID, ID } from "./appwrite";

// Sample Vietnamese dessert products based on the menu
const sampleProducts = [
  {
    name: "Sữa chua truyền thống",
    description:
      "Sữa chua handmade truyền thống, thơm béo ngậy, vị chua ngọt hài hòa.",
    ingredients: "Sữa tươi, men vi sinh, đường",
    price: 8000,
    category: "yogurt",
    isBestSeller: true,
    image_url: null,
    itemsSold: 0,
  },
  {
    name: "Sữa chua Phomai",
    description: "Sữa chua kết hợp với phô mai béo ngậy, tan chảy trong miệng.",
    ingredients: "Sữa tươi, men vi sinh, phô mai",
    price: 10000,
    category: "yogurt",
    isBestSeller: true,
    image_url: null,
    itemsSold: 0,
  },
  {
    name: "Sữa chua Matcha Phomai",
    description:
      "Sự kết hợp hoàn hảo giữa matcha Nhật Bản và phô mai béo ngậy.",
    ingredients: "Sữa tươi, matcha, phô mai",
    price: 10000,
    category: "yogurt",
    isBestSeller: true,
    image_url: null,
    itemsSold: 0,
  },
  {
    name: "Tàu hũ Singapore nguyên vị",
    description: "Tàu hũ Singapore mềm mịn, ngọt thanh, tan ngay khi chạm môi.",
    ingredients: "Đậu nành, đường phèn, gừng",
    price: 8000,
    category: "tofu",
    isBestSeller: true,
    image_url: null,
    itemsSold: 0,
  },
  {
    name: "Tàu hũ Singapore lá dứa",
    description: "Tàu hũ Singapore vị lá dứa thơm lừng, thanh mát.",
    ingredients: "Đậu nành, đường phèn, lá dứa",
    price: 8000,
    category: "tofu",
    isBestSeller: false,
    image_url: null,
    itemsSold: 0,
  },
  {
    name: "Hộp trái cây mix 750ml",
    description: "Hộp trái cây tươi mix cùng sữa chua thơm ngon.",
    ingredients: "Sữa chua, trái cây tươi theo mùa",
    price: 35000,
    category: "combo",
    isBestSeller: false,
    image_url: null,
    itemsSold: 0,
  },
];

export async function seedProducts(): Promise<{
  success: boolean;
  message: string;
  count?: number;
}> {
  try {
    // Check if products already exist
    const existingProducts = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID
    );

    if (existingProducts.total > 0) {
      return {
        success: true,
        message: `Database already has ${existingProducts.total} products. Skipping seed.`,
        count: existingProducts.total,
      };
    }

    // Add sample products
    let addedCount = 0;
    for (const product of sampleProducts) {
      await databases.createDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        ID.unique(),
        product
      );
      addedCount++;
    }

    return {
      success: true,
      message: `Successfully added ${addedCount} sample products!`,
      count: addedCount,
    };
  } catch (error) {
    console.error("Error seeding products:", error);
    return {
      success: false,
      message: `Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
