
export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">My Account</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Profile Information</h2>

          <div className="space-y-3">
            <p>
              <span className="font-medium">Name:</span> Prem Sharma
            </p>

            <p>
              <span className="font-medium">Email:</span>
              prem@example.com
            </p>

            <p>
              <span className="font-medium">Phone:</span>
              +91 9876543210
            </p>
          </div>
        </div>

        {/* Account Actions */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Account Settings</h2>

          <div className="flex flex-col gap-3">
            <button className="rounded-lg bg-primary px-4 py-2 text-white">
              Edit Profile
            </button>

            <button className="rounded-lg border px-4 py-2">
              My Orders
            </button>

            <button className="rounded-lg border px-4 py-2">
              Wishlist
            </button>

            <button className="rounded-lg border px-4 py-2">
              Change Password
            </button>

            <button className="rounded-lg bg-red-500 px-4 py-2 text-white">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

