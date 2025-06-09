"use client";

import React, { useState } from "react";

type Props = {
  onFileUpload: (file: File) => void;
};

const AudioUpload: React.FC<Props> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;
    const validMimeTypes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/ogg",
    ];
    const validExtensions = ["mp3", "wav", "ogg"];

    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (
      validMimeTypes.includes(file.type) &&
      fileExtension &&
      validExtensions.includes(fileExtension)
    ) {
      setSelectedFile(file);
      onFileUpload(file);
    } else {
      e.target.value = ""; // Reset file input
      setError("Please upload a valid audio file (MP3, WAV, OGG).");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <>
      <div className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl p-4 border rounded-lg shadow-md w-full max-w-md mx-auto">
        <label htmlFor="mp3-upload" className="block mb-2 font-semibold">
          Upload MP3 File
        </label>
        <input
          id="mp3-upload"
          type="file"
          accept=".mp3,.wav,.ogg,audio/mpeg,audio/wav,audio/ogg"
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded px-3 py-2 bg-gray-200 dark:bg-gray-800"
        />
      </div>
      {error && (
        <p className="text-red-500">
          <span className="font-semibold">Error: </span>
          {error}
        </p>
      )}
    </>
  );
};

export default AudioUpload;
