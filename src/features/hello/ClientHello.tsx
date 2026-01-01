"use client";

import useSWR from "swr";
import type { IHello } from "./api/get-hello";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ClientHello = () => {
  const { data, error } = useSWR<IHello>("/api/hello", fetcher);

  if (error) return <div>Client Error loading data</div>;
  if (!data) return <div>Client Loading...</div>;

  return <div>Client Side: {data.text}</div>;
};
