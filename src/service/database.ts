import { sql } from "@vercel/postgres";
import type { Endpoint, Result } from "./index";

export const endpoints = async (): Promise<Endpoint[]> => {
  const { rows } =
    await sql<Endpoint>`select * from endpoint where deleted_at is null`;
  return rows;
};

export const results = async (key?: string): Promise<Result[]> => {
  if (key) {
    const { rows } =
      await sql<Result>`select * from endpoint_result where key = ${key} and deleted_at is null`;
    return rows;
  }
  const { rows } =
    await sql<Result>`select * from endpoint_result where deleted_at is null`;
  return rows;
};
