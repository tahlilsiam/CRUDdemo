import connectionDB from "@/libs/database";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectionDB();

  await Topic.create({ title, description });
  return NextResponse.json({ message: "New Topic" }, { status: 201 });
}

export async function GET() {
  await connectionDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectionDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: " Topic Deleted !! " }, { status: 200 });
}
