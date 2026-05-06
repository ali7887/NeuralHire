"use client";

import { useState } from "react";
import { useApplyForm } from "./hooks/useApplyForm";
import styles from "./apply-form.module.css";

interface ApplyFormProps {
  jobId: string;
}

export function ApplyForm({ jobId }: ApplyFormProps) {

  const { fields, setters, state, handleSubmit, uploadResume } =
    useApplyForm({ jobId });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploading(true);

    try {
      await uploadResume(file);
      setFileName(file.name);
    } catch (err: any) {
      setUploadError(err?.message || "Resume upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form autoComplete="off" className={styles.form} onSubmit={handleSubmit}>

      <h2 className={styles.title}>Apply for this job</h2>

      {/* Resume Upload */}
      <div className={styles.field}>
        <label htmlFor="resume">Resume (PDF)</label>

        <input
          id="resume"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={uploading || state.isSubmitting}
        />

        {uploading && (
          <p className={styles.uploading}>
            Uploading resume...
          </p>
        )}

        {fileName && (
          <p className={styles.uploaded}>
            {fileName} uploaded ✅
          </p>
        )}

        {uploadError && (
          <p className={styles.error}>
            {uploadError}
          </p>
        )}
      </div>

      {/* Cover Letter */}
      <div className={styles.field}>
        <label htmlFor="coverLetter">Cover Letter</label>

        <textarea
          id="coverLetter"
          value={fields.coverLetter}
          onChange={(e) => setters.setCoverLetter(e.target.value)}
          rows={5}
          disabled={state.isSubmitting}
        />
      </div>

      {/* Application Error */}
      {state.error && (
        <div className={styles.error}>
          {state.error}
        </div>
      )}

      {/* Success Message */}
      {state.success && (
        <div className={styles.success}>
          Application submitted successfully!
        </div>
      )}

      <button
        className={styles.submit}
        type="submit"
        disabled={
          state.isSubmitting ||
          uploading ||
          !fields.resumePath
        }
      >
        {state.isSubmitting
          ? "Submitting..."
          : "Submit Application"}
      </button>

    </form>
  );
}
