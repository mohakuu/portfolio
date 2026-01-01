import { client } from "@/libs/client";

export interface IHello {
  text: string;
}

// Server Component から直接呼ぶ用
export async function getHello(): Promise<IHello> {
  return client.get<IHello>({ endpoint: "hello" });
}
