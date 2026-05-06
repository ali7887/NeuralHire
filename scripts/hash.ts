import bcrypt from "bcryptjs";

async function generate() {
  const hash = await bcrypt.hash("Admin123!", 10);
  console.log("Hash:", hash);
}

generate();



