import { desc, sql } from "drizzle-orm";
import { db } from "./db";
import { documentTable } from "./db/schema";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";

const query = "今日の仙台市の天気は？";

const { embedding } = await embed({
  model: openai.embedding("text-embedding-3-small"),
  value: query,
})

const similarity = sql<number>`1 - vector_distance_cos(${documentTable.embedding}, vector(${JSON.stringify(embedding)}))`

const res = await db.select({
  document: documentTable.document,
  similarity: similarity
}).from(documentTable).orderBy(desc(similarity))

console.log(res)