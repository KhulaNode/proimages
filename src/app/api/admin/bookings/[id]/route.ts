import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, adminNotes } = body;

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        status,
        adminNotes: adminNotes || undefined,
        confirmedAt: status === "CONFIRMED" ? new Date() : undefined,
        completedAt: status === "COMPLETED" ? new Date() : undefined,
        cancelledAt: status === "CANCELLED" ? new Date() : undefined,
      },
      include: {
        service: true,
      },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
