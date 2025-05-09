import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Product } from "@/lib/products";
import { useCart } from "@/providers/CartProvider";

interface Response {
  message: string;
  action: {
    type: string;
    cartAction: string;
    cartItem: {
      product: Product;
      quantity: number;
    };
    cart: {
      items: Product[];
      total: number;
    };
    products: Product[];
    product: Product;
  } | null;
}

export default function AiResponse({
  message,
}: {
  message: { role: string; text: string };
}) {
  const [content, setContent] = useState<Response | null>(null);
  const { addToCart, removeFromCart, updateCartItemQuantity, setIsCartOpen } =
    useCart();

  useEffect(() => {
    if (message.text) {
      try {
        const parsedContent = JSON.parse(message.text);
        setContent(parsedContent);
      } catch (error) {
        console.error("Failed to parse message content:", error);
      }
    }
  }, [message.text]);

  useEffect(() => {
    if (content?.action?.type === "cart") {
      handleCartAction(content.action);
    }
  }, [content]);

  const handleCartAction = (action: any) => {
    switch (action.cartAction) {
      case "add":
        if (action.cartItem?.product && action.cartItem?.quantity) {
          addToCart(action.cartItem.product, action.cartItem.quantity);
        }
        break;
      case "update":
        if (action.cartItem?.product?.name && action.cartItem?.quantity) {
          updateCartItemQuantity(
            action.cartItem.product.name,
            action.cartItem.quantity
          );
        }
        break;
      case "remove":
        if (action.cartItem?.product?.name) {
          removeFromCart(action.cartItem.product.name);
        }
        break;
      default:
        break;
    }
  };

  if (!content) return null;

  const renderAction = () => {
    if (!content.action) return null;

    switch (content.action.type) {
      case "show_products":
        return (
          <div className="mt-2 space-y-3">
            {content.action.products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex bg-gray-50 p-2 rounded-md"
              >
                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt="Description"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-2 flex-1">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {product.description}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm font-semibold">
                      ₱{product.discountedPrice}
                    </span>
                    {product.price !== product.discountedPrice && (
                      <span className="text-xs text-gray-400 line-through ml-1">
                        ₱{product.price}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "show_product":
        const product = content.action.product;
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 bg-gray-50 p-3 rounded-md"
          >
            <div className="flex mb-2">
              <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                <img
                  src={product.imageUrl}
                  alt="Description"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium">{product.name}</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-semibold">
                    ₱{product.discountedPrice}
                  </span>
                  {product.price !== product.discountedPrice && (
                    <span className="text-xs text-gray-400 line-through ml-1">
                      ₱{product.price}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {product.brand} • {product.color}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600">{product.description}</p>
            {product.quantity <= 5 && (
              <p className="text-xs text-orange-500 mt-1">
                Only {product.quantity} left in stock!
              </p>
            )}
          </motion.div>
        );

      case "compare_products":
        return (
          <div className="mt-2">
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex space-x-2">
                {content.action.products.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex-1"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={product.imageUrl}
                        alt="Description"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-medium text-sm mt-2">{product.name}</p>
                    <p className="text-sm font-semibold">₱{product.price}</p>
                    <p className="text-xs text-gray-600">
                      {product.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case "cart":
        return renderCartAction();

      default:
        return null;
    }
  };

  const renderCartAction = () => {
    if (!content.action) return null;

    switch (content.action.cartAction) {
      case "show":
      case "add":
      case "update":
      case "remove":
        return (
          <div className="mt-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="mt-2 text-blue-500 underline"
            >
              View Cart
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex justify-start"
    >
      <div className="max-w-3/4 p-3 rounded-lg bg-white border border-gray-200 rounded-bl-none">
        <p className="text-sm">{content.message}</p>
        {renderAction()}
      </div>
    </motion.div>
  );
}
