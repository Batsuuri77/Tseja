import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const productsData = await db.product.findMany({
        select: {
          id: true,
          category: true,
          subCategory: true,
          name: true,
          priceInMnt: true,
          numberOfItems: true,
          fit: true,
          sex: true,
          brand: true,
          size: true,
          age: true,
          season: true,
          generalColor: true,
          pattern: true,
          material: true,
          isAvailableForOrder: true,
          filePath: true,
          imagePath: true,
          description: true,
          isAvailableForPurchase: true,
          _count: { select: { orders: true } }
        },
        orderBy: { name: "asc" }
      });
      setProducts(productsData);
    }

    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button>
          <Link href="/admin1/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable products={products} />
    </>
  );
}

function ProductsTable({ products }) {
  if (products.length === 0) return <p>No products found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForPurchase ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle />
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInMnt)}</TableCell>
            <TableCell>{formatNumber(product._count.orders)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
