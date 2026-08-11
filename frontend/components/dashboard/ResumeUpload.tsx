"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
  X,
} from "lucide-react";

export default function ResumeUpload() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (selectedFile: File) => {
    setError("");

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF resume.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Resume size must be less than 10MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a resume first.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("Please login again.");
      }

      const formData = new FormData();
      formData.append("file", file);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(`${apiUrl}/resume/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid response from server.");
      }

      if (!response.ok) {
        throw new Error(data.detail || "Resume upload failed.");
      }

      console.log("Resume uploaded successfully:", data);

      /*
       * Store backend response temporarily.
       * Dashboard will read this data after redirect.
       */
      sessionStorage.setItem("resume_upload_response", JSON.stringify(data));

      /*
       * Redirect user to dashboard.
       */
      router.push(`/resume-analysis?resume_id=${data.id}`);
      localStorage.setItem("latest_resume_id", String(data.id));
    } catch (error) {
      console.error("Resume upload error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while uploading.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative">
        {/* Heading */}
        <div className="mb-7">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-600/20">
              <FileText className="h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                Resume Analyzer
              </h2>

              <p className="text-sm text-gray-500">
                Get AI-powered insights from your resume.
              </p>
            </div>
          </div>
        </div>

        {/* Upload area */}
        {!file ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`group relative flex min-h-[230px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 text-center transition-all duration-300 ${
              dragging
                ? "border-violet-500/70 bg-violet-500/10"
                : "border-white/10 bg-black/10 hover:border-violet-500/40 hover:bg-white/[0.03]"
            }`}
          >
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 cursor-pointer opacity-0"
            />

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] transition duration-300 group-hover:scale-105 group-hover:border-violet-500/30 group-hover:bg-violet-500/10">
              <Upload className="h-6 w-6 text-violet-400" />
            </div>

            <h3 className="text-base font-medium text-gray-200">
              Drop your resume here
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              or click to browse from your computer
            </p>

            <span className="mt-4 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-600">
              PDF • Maximum 10MB
            </span>
          </div>
        ) : (
          <>
            {/* Selected file */}
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.05] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 to-blue-600/20">
                  <FileText className="h-5 w-5 text-violet-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-gray-200">
                      {file.name}
                    </p>

                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze
                  </p>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  disabled={uploading}
                  className="rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Analyze button */}
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 font-semibold shadow-xl shadow-violet-600/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-violet-600/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Uploading Resume...
                </>
              ) : (
                <>
                  Analyze Resume
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </>
              )}
            </button>
          </>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <X className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
