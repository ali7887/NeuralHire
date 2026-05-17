/* eslint-disable no-undef */
import "dotenv/config"
import { semanticJobSearch } from "../src/lib/ai/search"

async function run() {

  const result = await semanticJobSearch("React developer remote")

  console.log(JSON.stringify(result, null, 2))
}

run()
