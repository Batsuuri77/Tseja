import { Prisma } from "@prisma/client";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const newProduct = await prisma.product.create({
        data: {
          category: "Clothing",
          subCategory: "Tops",
          name: "T-Shirt",
          priceInMnt: 1500
          // Add other fields as needed
        }
      });

      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
