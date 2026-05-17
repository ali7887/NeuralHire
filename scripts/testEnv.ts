/* eslint-disable no-undef */
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

console.log("API URL:", process.env.GAPGPT_API_URL)
