import styles from "./job-details.module.css";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
}

async function getJob(id: string): Promise<Job | null> {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${BASE_URL}/api/public/jobs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const job = await getJob(id);

  if (!job) {
    return <div className={styles.notFound}>آگهی پیدا نشد</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{job.title}</h1>

      <p className={styles.location}>{job.location}</p>

      <div className={styles.description}>
        {job.description}
      </div>
    </div>
  );
}
