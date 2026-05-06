import { createJob } from "./actions";

export default function JobsPage() {
  return (
    <form autoComplete="off" action={createJob} className="card">
      <h3>Create Job</h3>

      <input name="title" placeholder="Job title" required />
      <input name="company" placeholder="Company" required />

      <button type="submit">Create</button>
    </form>
  );
}
