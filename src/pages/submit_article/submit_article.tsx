import React, { useState } from "react";
import axios from "axios";

interface ArticleMeta {
  type: "Paper" | "Book" | "Conference";
  journalName: string;
  publicationYear: number;
  doi: string;
  keywords: string;
  status: "Published" | "Draft";
}

const SubmitArticle: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [meta, setMeta] = useState<ArticleMeta>({
    type: "Paper",
    journalName: "",
    publicationYear: new Date().getFullYear(),
    doi: "",
    keywords: "",
    status: "Draft",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("description", description);
      formData.append("meta[type]", meta.type);
      formData.append("meta[journalName]", meta.journalName);
      formData.append("meta[publicationYear]", meta.publicationYear.toString());
      formData.append("meta[doi]", meta.doi);
      formData.append("meta[keywords]", meta.keywords);
      formData.append("meta[status]", meta.status);
      if (file) formData.append("file", file);

      // TODO: Replace with your backend endpoint
      const response = await axios.post("http://localhost:4561/api/articles", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("✅ Article submitted successfully!");
      console.log(response.data);
      setTitle("");
      setBody("");
      setDescription("");
      setFile(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      setMessage("❌ Failed to submit article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          📝 Submit Your Article
        </h1>

        {message && (
          <div
            className={`p-3 rounded mb-4 text-center ${
              message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Body */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Body</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          {/* Meta Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Type</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2"
                value={meta.type}
                onChange={(e) => setMeta({ ...meta, type: e.target.value as ArticleMeta["type"] })}
              >
                <option value="Paper">Paper</option>
                <option value="Book">Book</option>
                <option value="Conference">Conference</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Status</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2"
                value={meta.status}
                onChange={(e) => setMeta({ ...meta, status: e.target.value as ArticleMeta["status"] })}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Journal Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={meta.journalName}
                onChange={(e) => setMeta({ ...meta, journalName: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Publication Year</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={meta.publicationYear}
                onChange={(e) => setMeta({ ...meta, publicationYear: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">DOI</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={meta.doi}
                onChange={(e) => setMeta({ ...meta, doi: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Keywords (comma separated)</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={meta.keywords}
                onChange={(e) => setMeta({ ...meta, keywords: e.target.value })}
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Upload File</label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded-lg p-2"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Article"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitArticle;
