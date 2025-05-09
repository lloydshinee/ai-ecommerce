import { CategoryFilter } from "@/components/CategoryFilter";
import { Products } from "@/components/Products";
import { CartSidebar } from "@/components/CartSidebar";

export default async function EcommerceApp() {
  return (
    <main className="container mx-auto px-4 py-8">
      <CategoryFilter />
      <Products />
      <CartSidebar />
    </main>
  );
}
