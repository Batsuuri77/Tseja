"use server";
import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"));

const addSchema = z.object({
  category: z.string().min(1),
  subCategory: z.string().min(1),
  name: z.string().min(1),
  originalPriceInMnt: z.coerce.number().int().min(1),
  numberOfItems: z.coerce.number().int(),
  fit: z.string(),
  sex: z.string().min(1),
  brand: z.string().min(1),
  size: z.string().min(1),
  season: z.string().min(1),
  generalColor: z.string().min(1),
  pattern: z.string().min(1),
  material: z.string().min(1),
  isAvailableForOrder: z.boolean(),
  file: fileSchema.refine(file => file.size > 0, "Required"),
  image: imageSchema.refine(file => file.size > 0, "Required"),
  description: z.string()
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));

  await db.product.create({
    data: {
      category: data.category,
      subCategory: data.subCategory,
      name: data.name,
      originalPriceInMnt: data.originalPriceInMnt,
      numberOfItems: data.numberOfItems,
      fit: data.fit,
      sex: data.sex,
      brand: data.brand,
      size: data.size,
      season: data.season,
      generalColor: data.generalColor,
      pattern: data.pattern,
      material: data.material,
      isAvailableForOrder: data.isAvailableForOrder,
      filePath,
      imagePath,
      description: data.description,
      isAvailableForPurchase: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
  redirect("/admin1/products");
}
