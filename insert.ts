import { openai } from '@ai-sdk/openai';
import { embedMany } from 'ai';
import { db } from './db';
import { documentTable } from './db/schema';
import { sql } from 'drizzle-orm';

const documents = [
  "今日の仙台の気温は14℃です．",
  "今日の仙台の天気は曇りです．",
  "私の好きな動物はペンギンです．",
  "機能はキムチ鍋を食べました．"
]

const { embeddings } = await embedMany({
  model: openai.embedding('text-embedding-3-small'),
  values: documents,
});

await db.insert(documentTable).values(
  embeddings.map((embedding, i) => ({
    document: documents[i],
    embedding: sql`vector32(${JSON.stringify(embedding)})`,
  }))
)