import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("📩 Request Body:", body);

    const { name, experience, rating } = body;

    if (!name || experience === undefined || rating === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newCarpenter = await prisma.carpenter.create({
      data: {
        name,
        experience: Number(experience),
        rating: Number(rating),
      },
    });

    console.log("✅ Carpenter Created:", newCarpenter);
    return NextResponse.json(newCarpenter, { status: 201 }); 

  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json( 
      { error: "Failed to create carpenter", details: error.message },
      { status: 500 }
    );
  }
}


export async function GET() {
    try {
      const carpenters = await prisma.carpenter.findMany();
      return NextResponse.json(carpenters, { status: 200 });
    } catch (error) {
      console.error("❌ Error fetching carpenters:", error);
      return NextResponse.json({ error: "Failed to fetch carpenters" }, { status: 500 });
    }
  }