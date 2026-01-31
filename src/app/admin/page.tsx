import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatDate, formatTime, formatCurrency } from "@/lib/utils";

export default async function AdminDashboard() {
  const bookings = await prisma.booking.findMany({
    include: { service: true },
    orderBy: { bookingDate: "asc" },
    take: 10,
  });

  const stats = {
    total: await prisma.booking.count(),
    pending: await prisma.booking.count({ where: { status: "PENDING" } }),
    confirmed: await prisma.booking.count({ where: { status: "CONFIRMED" } }),
    completed: await prisma.booking.count({ where: { status: "COMPLETED" } }),
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/" className="text-proimages-orange hover:underline">
          View Site
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-proimages-gray rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Total Bookings</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-6">
          <p className="text-yellow-400 text-sm mb-2">Pending</p>
          <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
        </div>
        <div className="bg-green-500/20 border border-green-500 rounded-lg p-6">
          <p className="text-green-400 text-sm mb-2">Confirmed</p>
          <p className="text-3xl font-bold text-green-400">{stats.confirmed}</p>
        </div>
        <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-6">
          <p className="text-blue-400 text-sm mb-2">Completed</p>
          <p className="text-3xl font-bold text-blue-400">{stats.completed}</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-proimages-gray rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Bookings</h2>
          <Link
            href="/admin/bookings"
            className="text-proimages-orange hover:underline"
          >
            View All
          </Link>
        </div>

        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-2">Booking #</th>
                  <th className="text-left py-3 px-2">Client</th>
                  <th className="text-left py-3 px-2">Service</th>
                  <th className="text-left py-3 px-2">Date</th>
                  <th className="text-left py-3 px-2">Time</th>
                  <th className="text-left py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-800">
                    <td className="py-3 px-2 font-mono text-sm">
                      {booking.bookingNumber}
                    </td>
                    <td className="py-3 px-2">{booking.clientName}</td>
                    <td className="py-3 px-2">{booking.service.name}</td>
                    <td className="py-3 px-2">{formatDate(booking.bookingDate)}</td>
                    <td className="py-3 px-2">{formatTime(booking.startTime)}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No bookings yet</p>
        )}
      </div>
    </div>
  );
}

function getStatusStyle(status: string): string {
  const styles: Record<string, string> = {
    PENDING: "bg-yellow-500/20 text-yellow-400",
    CONFIRMED: "bg-green-500/20 text-green-400",
    COMPLETED: "bg-blue-500/20 text-blue-400",
    CANCELLED: "bg-red-500/20 text-red-400",
  };
  return styles[status] || "bg-gray-500/20 text-gray-400";
}
