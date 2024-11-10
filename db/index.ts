import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { sql } from "drizzle-orm";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(turso);

await db.run(sql`
  CREATE INDEX IF NOT EXISTS vector_index
  ON document_table (libsql_vector_idx(embedding))
`);
