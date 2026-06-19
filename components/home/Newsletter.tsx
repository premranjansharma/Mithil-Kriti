export default function Newsletter() {
  return (
    <section className="py-16 bg-[#a49393] text-[#E8D5A0]">
      <div className="max-w-xl mx-auto text-center px-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Subscribe Newsletter
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full flex-1 px-4 py-3 rounded-lg bg-white text-black placeholder-gray-500"
          />

          <button className="w-full sm:w-auto bg-yellow-600 px-6 py-3 rounded">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}