import { db } from "@/lib/db"
import { jobs } from "@/lib/db/schema"
import { redirect } from "next/navigation"

async function createJob(formData: FormData) {
  "use server"

  await db.insert(jobs).values({
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    salary: Number(formData.get("salary")),
    employerId: "ef2c793e-cc5e-4f9c-a55f-c6bfad0c2e5b", 
    companyId: "a8c6f6a9-4c39-41de-af7d-88dcbff8eb76",
    published: true
  })

  redirect("/dashboard")
}

export default function NewJobPage() {
  return (
    <form autoComplete="off" action={createJob}>
      <h1>Create Job</h1>
      <input name="title" placeholder="Title" />
      <input name="location" placeholder="Location" />
      <input name="salary" placeholder="Salary" />
      <button type="submit">Create Job</button>
    </form>
  )
}
