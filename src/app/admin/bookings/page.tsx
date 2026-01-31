"use client";

import { useState, useEffect } from "react";
import { formatDate, formatTime } from "@/lib/utils";

interface Booking {
  id: string;
  bookingNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  bookingDate: string;
  startTime: string;
  status: string;
  service: {
    name: string;
  };
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchBookings(); // Refresh the list
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.status === filter.toUpperCase());

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Bookings</h1>
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === f
                  ? "bg-proimages-orange text-white"
                  : "bg-proimages-gray hover:bg-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-proimages-gray rounded-lg p-6 flex justify-between items-start"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-xl font-bold">{booking.bookingNumber}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Client</p>
                    <p className="font-bold">{booking.clientName}</p>
                    <p className="text-gray-400">{booking.clientEmail}</p>
                    <p className="text-gray-400">{booking.clientPhone}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Service</p>
                    <p className="font-bold">{booking.service.name}</p>
                    <p className="text-gray-400">
                      {formatDate(booking.bookingDate)} at{" "}
                      {formatTime(booking.startTime)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {booking.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => updateBookingStatus(booking.id, "CONFIRMED")}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-bold"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, "CANCELLED")}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-bold"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {booking.status === "CONFIRMED" && (
                  <button
                    onClick={() => updateBookingStatus(booking.id, "COMPLETED")}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-bold"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-proimages-gray rounded-lg">
          <p className="text-gray-400">No bookings found</p>
        </div>
      )}
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
