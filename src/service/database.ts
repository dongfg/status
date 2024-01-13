import { sql } from "@vercel/postgres";
import type { Endpoint, Result } from "./index";

export const endpoints = async (): Promise<Endpoint[]> => {
  const { rows } = await sql<Endpoint>`select * from endpoint`;
  return rows;
};

export const results = async (key: string): Promise<Result[]> => {
  const { rows } =
    await sql<Result>`select * from endpoint_result where key = ${key}`;
  return rows;
};
