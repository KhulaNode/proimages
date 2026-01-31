import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateBookingNumber } from "@/lib/utils";
import { sendEmail, generateBookingConfirmationEmail, generateAdminNotificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      serviceId,
      bookingDate,
      startTime,
      endTime,
      clientName,
      clientEmail,
      clientPhone,
      clientNotes,
    } = body;

    // Validate required fields
    if (!serviceId || !bookingDate || !startTime || !endTime || !clientName || !clientEmail || !clientPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get service details
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    // Generate booking number
    const bookingNumber = generateBookingNumber();

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        serviceId,
        bookingDate: new Date(bookingDate),
        startTime,
        endTime,
        clientName,
        clientEmail,
        clientPhone,
        clientNotes: clientNotes || null,
        status: "PENDING",
      },
      include: {
        service: true,
      },
    });

    // Send confirmation email to client
    try {
      await sendEmail({
        to: clientEmail,
        subject: `Booking Confirmation - ${bookingNumber}`,
        html: generateBookingConfirmationEmail({
          bookingNumber,
          clientName,
          serviceName: service.name,
          bookingDate: new Date(bookingDate).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          startTime,
        }),
      });
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Don't fail the booking if email fails
    }

    // Send notification to admin
    try {
      await sendEmail({
        to: process.env.BUSINESS_EMAIL || 'molavovic@gmail.com',
        subject: `New Booking - ${bookingNumber}`,
        html: generateAdminNotificationEmail({
          bookingNumber,
          clientName,
          clientEmail,
          clientPhone,
          serviceName: service.name,
          bookingDate: new Date(bookingDate).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          startTime,
        }),
      });
    } catch (emailError) {
      console.error("Error sending admin notification:", emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json({
      success: true,
      bookingNumber: booking.bookingNumber,
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
