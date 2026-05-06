"use client";

import { useEffect, useState, use } from "react"; // ✅ اضافه کردن use از ری‌اکت
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

// ✅ تعریف تایپ مطابق با استانداردهای نکس 15
interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default function EditJobPage({ params }: EditJobPageProps) {
  const router = useRouter();
  
  // ✅ در نکس 15، پارامترها به صورت پرومیس هستند، با هوک use آن‌ها را باز می‌کنیم
  const { id } = use(params); 
  
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    // ✅ حالا از id که استخراج شده استفاده می‌کنیم
    fetch(`/api/employer/jobs/${id}`)
      .then((r) => r.json())
      .then(setJob);
  }, [id]);

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      location: e.target.location.value,
      salary: Number(e.target.salary.value),
    };

    // ✅ اصلاح مسیر API
    await fetch(`/api/employer/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    router.push(`/employer/jobs/${id}`);
  };

  if (!job) return <div className="p-10 text-center">در حال بارگذاری...</div>;

  return (
    <form autoComplete="off" onSubmit={submit} className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold mb-6">ویرایش شغل</h1>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">عنوان شغل</label>
        <input name="title" defaultValue={job.title} className="input border p-2 rounded" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">توضیحات</label>
        <textarea name="description" defaultValue={job.description} className="input border p-2 rounded h-32" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">موقعیت مکانی</label>
        <input name="location" defaultValue={job.location} className="input border p-2 rounded" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">حقوق</label>
        <input name="salary" defaultValue={job.salary ?? ""} type="number" className="input border p-2 rounded" />
      </div>

      <Button type="submit" className="w-full">ذخیره تغییرات</Button>
    </form>
  );
}
