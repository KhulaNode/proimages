import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatDate, formatTime } from "@/lib/utils";

export default async function BookingConfirmationPage({
  params,
}: {
  params: { bookingNumber: string };
}) {
  const booking = await prisma.booking.findUnique({
    where: { bookingNumber: params.bookingNumber },
    include: { service: true },
  });

  if (!booking) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-proimages-dark">
      <div className="section-container max-w-3xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400 text-lg">
            Thank you for choosing ProImages Creative House
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-proimages-gray rounded-lg p-8 mb-8">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-400">Booking Number</p>
            <p className="text-2xl font-bold text-proimages-orange">
              {booking.bookingNumber}
            </p>
          </div>

          <div className="space-y-4 border-t border-gray-700 pt-6">
            <div className="flex justify-between">
              <span className="text-gray-400">Service</span>
              <span className="font-bold">{booking.service.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date</span>
              <span className="font-bold">{formatDate(booking.bookingDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time</span>
              <span className="font-bold">
                {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-bold">
                Pending Confirmation
              </span>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 mt-6">
            <p className="text-gray-400 text-sm">
              <strong className="text-white">Client:</strong> {booking.clientName}
            </p>
            <p className="text-gray-400 text-sm">
              <strong className="text-white">Email:</strong> {booking.clientEmail}
            </p>
            <p className="text-gray-400 text-sm">
              <strong className="text-white">Phone:</strong> {booking.clientPhone}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-proimages-orange/10 border border-proimages-orange rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">What happens next?</h2>
          <ol className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-proimages-orange font-bold mr-2">1.</span>
              <span>
                We've sent a confirmation email to <strong>{booking.clientEmail}</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-proimages-orange font-bold mr-2">2.</span>
              <span>
                Our team will review your booking and confirm within 24 hours
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-proimages-orange font-bold mr-2">3.</span>
              <span>You'll receive a final confirmation via email and SMS</span>
            </li>
            <li className="flex items-start">
              <span className="text-proimages-orange font-bold mr-2">4.</span>
              <span>Payment is due on the day of your session</span>
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div className="text-center space-x-4">
          <a href="/" className="btn-secondary inline-block">
            Back to Home
          </a>
          <a href="/portfolio" className="btn-primary inline-block">
            View Our Work
          </a>
        </div>
      </div>
    </main>
  );
}
