 
import JobSeekerHeader from "@/components/job-seeker/JobSeekerHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JobSeekerHeader />
      {children}
    </>
  );
}
