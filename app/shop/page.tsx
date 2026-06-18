
import Link from "next/link";

const categories = [
  "Sarees",
  "Suit Sets",
  "Tops",
  "T-Shirts",
  "Men's Kurta",
  "Men's Shirts",
  "Bedsheets",
  "Wall Hangings",
  "Madhubani Paintings",
  "Handcrafted Bags",
  "Home Decor",
  "Custom Orders",
];

const products = [
  {
    id: 1,
    name: "Mithila Saree",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1583391733981-849f1f3f6f6e?w=600",
  },
  {
    id: 2,
    name: "Handcrafted Bag",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 3,
    name: "Madhubani Painting",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",
  },
  {
    id: 4,
    name: "Traditional Dupatta",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-3 text-4xl font-bold">
            Mithila Kriti Shop
          </h1>

          <p className="max-w-2xl text-muted-foreground">
            Discover authentic Mithila art, handcrafted bags,
            traditional sarees, paintings and cultural products.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Shop By Category
        </h2>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-primary hover:text-primary-foreground"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Featured Products
          </h2>

          <select className="rounded-lg border px-3 py-2">
            <option>Latest</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold">
                  {product.name}
                </h3>

                <p className="mb-4 text-xl font-bold text-primary">
                  ₹{product.price}
                </p>

                <div className="flex gap-2">
                  <Link
                    href={`/product/${product.id}`}
                    className="flex-1 rounded-lg border px-4 py-2 text-center"
                  >
                    View
                  </Link>

                  <button className="flex-1 rounded-lg bg-primary px-4 py-2 text-primary-foreground">
                    Add Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

