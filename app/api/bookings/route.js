import { prisma } from "../../../lib/prisma";

// ✅ GET - Fetch User's Bookings
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
    });
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: parseInt(userId) },
      include: {
        slot: {
          include: { carpenter: true },
        },
      },
    });

    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch bookings" }), {
      status: 500,
    });
  }
}

// ✅ POST - Create a New Booking
export async function POST(request) {
  try {
    const { userId, slotId } = await request.json();

    if (!userId || !slotId) {
      return new Response(
        JSON.stringify({ error: "User ID and slot ID are required" }),
        { status: 400 }
      );
    }

    // ✅ Check if Slot is Already Booked
    const existingBooking = await prisma.booking.findFirst({
      where: {
        slotId,
        status: { in: ["pending", "confirmed"] },
      },
    });

    if (existingBooking) {
      return new Response(JSON.stringify({ error: "Slot already booked" }), {
        status: 400,
      });
    }

    // ✅ Create Booking
    const booking = await prisma.booking.create({
      data: {
        user: { connect: { id: userId } },
        slot: { connect: { id: slotId } },
        status: "pending",
      },
    });

    return new Response(JSON.stringify(booking), { status: 201 });
  } catch (error) {
    console.error("❌ Booking Error:", error);
    return new Response(JSON.stringify({ error: "Booking failed" }), {
      status: 500,
    });
  }
}

// ✅ PATCH - Confirm or Cancel a Booking
export async function PATCH(request) {
  try {
    const { bookingId, status } = await request.json();

    if (!["confirmed", "cancelled"].includes(status)) {
      return new Response(JSON.stringify({ error: "Invalid status" }), {
        status: 400,
      });
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    return new Response(JSON.stringify(booking), { status: 200 });
  } catch (error) {
    console.error("❌ Error updating booking:", error);
    return new Response(JSON.stringify({ error: "Booking update failed" }), {
      status: 500,
    });
  }
}
