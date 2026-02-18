import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: "./src/utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
  verbose: true,
  strict: true,
});