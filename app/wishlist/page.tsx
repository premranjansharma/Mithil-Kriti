

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">My Wishlist</h1>

      <div className="rounded-xl border p-8 text-center">
        <h2 className="text-xl font-semibold">
          Your Wishlist is Empty
        </h2>

        <p className="mt-3 text-muted-foreground">
          Save your favorite Mithila Kriti products here.
        </p>

        <a
          href="/shop"
          className="mt-6 inline-block rounded-lg bg-primary px-5 py-2 text-primary-foreground"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}

