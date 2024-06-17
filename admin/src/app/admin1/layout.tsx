import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href={"/admin1"}>Dashboard</NavLink>
        <NavLink href={"/admin1/products"}>Products</NavLink>
        <NavLink href={"/admin1/users"}>Customers</NavLink>
        <NavLink href={"/admin1/orders"}>Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
