"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import styles from "./EmployerJobDetails.module.css";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  status?: string;
}

interface EmployerJobDetailsProps {
  params: {
    id: string;
  };
}

export default function EmployerJobDetails({ params }: EmployerJobDetailsProps) {
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);

        const res = await fetch(`/api/employer/jobs/${params.id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("خطا در دریافت اطلاعات شغل");
        }

        const data = await res.json();
        setJob(data);
      } catch (err: any) {
        setError(err.message || "مشکلی پیش آمده است");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [params.id]);

  const handleDelete = async () => {
    const confirmDelete = confirm("آیا از حذف این آگهی مطمئن هستید؟");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/employer/jobs/${params.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("حذف آگهی با خطا مواجه شد");
      }

      router.push("/dashboard/employer/jobs");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف آگهی");
    }
  };

  if (loading) {
    return <div className={styles.loading}>در حال بارگذاری...</div>;
  }

  if (error || !job) {
    return (
      <div className={styles.error}>
        <p>{error || "آگهی یافت نشد"}</p>
        <Button onClick={() => router.back()}>بازگشت</Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{job.title}</h1>
          <p className={styles.location}>{job.location}</p>
        </div>

        <div className={styles.actions}>
          <Button
            onClick={() =>
              router.push(`/dashboard/employer/jobs/${params.id}/edit`)
            }
          >
            ویرایش
          </Button>

          <Button variant="danger" onClick={handleDelete}>
            حذف
          </Button>
        </div>
      </div>

      <div className={styles.description}>
        <h3>توضیحات شغل</h3>
        <p>{job.description}</p>
      </div>

      <div className={styles.footer}>
        <Button variant="ghost" onClick={() => router.back()}>
          بازگشت به لیست
        </Button>
      </div>
    </div>
  );
}
