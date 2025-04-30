import { ShopHeader } from "@/components/ShopHeader";
import CartProvider from "@/providers/CartProvider";
import { ProductsProvider } from "@/providers/ProductsProvider";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <ProductsProvider>
        <CartProvider>
          <ShopHeader />
          {children}
        </CartProvider>
      </ProductsProvider>
    </main>
  );
}
