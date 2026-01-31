import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-proimages-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-proimages-gray border-r border-gray-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-proimages-orange mb-8">
            ProImages Admin
          </h1>
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="block px-4 py-3 rounded-lg hover:bg-proimages-dark transition-colors"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/admin/bookings"
              className="block px-4 py-3 rounded-lg hover:bg-proimages-dark transition-colors"
            >
              📅 Bookings
            </Link>
            <Link
              href="/admin/calendar"
              className="block px-4 py-3 rounded-lg hover:bg-proimages-dark transition-colors"
            >
              🗓️ Calendar
            </Link>
            <Link
              href="/admin/services"
              className="block px-4 py-3 rounded-lg hover:bg-proimages-dark transition-colors"
            >
              ⚙️ Services
            </Link>
            <Link
              href="/admin/portfolio"
              className="block px-4 py-3 rounded-lg hover:bg-proimages-dark transition-colors"
            >
              🖼️ Portfolio
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
