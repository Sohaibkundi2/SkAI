"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ImageEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // cleanup preview URL when file changes
  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // cleanup
    }
  }, [file]);

  const handleSubmit = async () => {
    if (!file || !prompt) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("prompt", prompt);

    try {
      const res = await axios.post("/api/image", formData);
      let url = res.data.output;

      if (typeof url === "object" && url.url) {
        url = url.url;
      }

      setResult(url || null);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-pink-400 p-6">
      <div className="w-full max-w-xl bg-zinc-900 border border-pink-500 rounded-2xl shadow-xl p-6 space-y-4">
        <h1 className="text-xl font-bold text-center">Sohaib's Image Editor</h1>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full p-2 text-sm text-gray-300 border border-zinc-700 rounded-lg cursor-pointer bg-zinc-800 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Enter your edit instruction..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? "Editing..." : "Edit Image"}
        </button>

        {/* Preview + Result side by side */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {preview && (
            <div>
              <p className="text-sm mb-2 text-center text-gray-300">Original</p>
              <img
                src={preview}
                alt="Preview"
                className="rounded-lg border border-pink-500"
              />
            </div>
          )}

          {result && (
            <div>
              <p className="text-sm mb-2 text-center text-gray-300">Edited</p>
              <img
                src={result}
                alt="Edited"
                className="rounded-lg border border-pink-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
