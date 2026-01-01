import { NextResponse } from "next/server";
import type { IHello } from "@/features/hello/api/get-hello";
import { client } from "@/libs/client";

export async function GET() {
  try {
    const data: IHello = await client.get({ endpoint: "hello" });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from microCMS:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
