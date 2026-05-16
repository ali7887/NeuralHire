/* eslint-disable no-undef */
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { getGapGPTClient } from "../src/lib/ai/client/gapgpt.client";

async function run() {
  const client = getGapGPTClient();

  const res = await client.chat([
    {
      role: "user",
      content: "Say hello in one short sentence.",
    },
  ]);

  console.log(res.choices?.[0]?.message?.content);
}

run();
