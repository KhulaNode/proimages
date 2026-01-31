"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate, formatTime, formatCurrency } from "@/lib/utils";
import type { BookingData } from "@/app/book/page";

interface BookingSummaryProps {
  bookingData: BookingData;
  onBack: () => void;
}

export default function BookingSummary({
  bookingData,
  onBack,
}: BookingSummaryProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const result = await response.json();
      router.push(`/booking/confirmation/${result.bookingNumber}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Booking error:", err);
      setLoading(false);
    }
  };

  const totalPrice = bookingData.servicePrice || 0;

  return (
    <div>
      <p className="text-gray-300 text-center mb-8">
        Review your booking details before confirming
      </p>

      {/* Summary Card */}
      <div className="bg-proimages-gray rounded-lg p-6 mb-8 space-y-6">
        {/* Service */}
        <div>
          <h3 className="text-sm text-gray-400 mb-1">Service</h3>
          <p className="text-xl font-bold">{bookingData.serviceName}</p>
          <p className="text-proimages-orange font-bold">
            {formatCurrency(bookingData.servicePrice || 0)}
          </p>
        </div>

        {/* Date & Time */}
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-sm text-gray-400 mb-1">Date & Time</h3>
          <p className="text-lg">
            {bookingData.bookingDate && formatDate(bookingData.bookingDate)}
          </p>
          <p className="text-gray-400">
            {bookingData.startTime && formatTime(bookingData.startTime)} -{" "}
            {bookingData.endTime && formatTime(bookingData.endTime)}
          </p>
          <p className="text-sm text-gray-500">
            Duration: {bookingData.duration} minutes
          </p>
        </div>

        {/* Client Details */}
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-sm text-gray-400 mb-1">Your Details</h3>
          <p className="text-lg">{bookingData.clientName}</p>
          <p className="text-gray-400">{bookingData.clientEmail}</p>
          <p className="text-gray-400">{bookingData.clientPhone}</p>
          {bookingData.clientNotes && (
            <div className="mt-2">
              <p className="text-sm text-gray-400">Notes:</p>
              <p className="text-sm text-gray-300">{bookingData.clientNotes}</p>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total</span>
            <span className="text-2xl font-bold text-proimages-orange">
              {formatCurrency(totalPrice)}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            No payment required now. Pay on the day of service.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary" disabled={loading}>
          Back
        </button>
        <button
          onClick={handleConfirm}
          className="btn-primary disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Confirming..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
