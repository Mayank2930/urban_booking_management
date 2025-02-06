import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const slots = await prisma.slot.findMany({
      where: {
        bookings: {
          none: {
            status: { in: ["pending", "confirmed"] }, 
          },
        },
      },
      include: {
        carpenter: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    console.log("Fetched Available Slots:", slots);
    return NextResponse.json(slots, { status: 200 });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch slots" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { carpenterId, startTime, endTime } = await request.json();

    if (!carpenterId || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingSlot = await prisma.slot.findFirst({
      where: {
        carpenterId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    if (existingSlot) {
      return NextResponse.json(
        { error: "Slot already exists", slot: existingSlot },
        { status: 400 }
      );
    }

    const newSlot = await prisma.slot.create({
      data: {
        carpenterId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    console.log("New Slot Created:", newSlot);
    return NextResponse.json(newSlot, { status: 201 });
  } catch (error) {
    console.error("Error creating slot:", error);
    return NextResponse.json(
      { error: "Failed to create slot", details: error.message },
      { status: 500 }
    );
  }
}
