import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes);
  } catch (error) {
    if (error instanceof Error) 
      return NextResponse.json({ message: error.message }, { status: 500 });
    
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    if (!title || !content) 
      throw new Error("O título e o conteúdo da nota não podem estar vazios.");
    
    const newNotes = await prisma.note.create({ data: { title, content } });
    return NextResponse.json(newNotes);
  } catch (error) {
    if (error instanceof Error) 
      return NextResponse.json({ message: error.message }, { status: 500 });
    
  }
}
