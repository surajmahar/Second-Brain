import { useRef, useState } from "react";
import { Crossicon } from "../icons/Crossicon";
import { Button } from "./button";
import { Input } from "./inputs";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateContentModel({ open, onClose }) {
  if (!open) return null; // Ensure the modal only renders when `open` is true

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal when clicking on the overlay
    }
  };

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

   

    if (!title || !link) {
      alert("Please provide both Title and Link!");
      return;
    }
    await axios.post(`${BACKEND_URL}/api/v1/content`,{
      link,
      title,
      type
    },{
      headers:{
        "Authorization":localStorage.getItem("token")
      }
    })
    onClose();

  }

  return (
    <div
  className="w-screen h-screen bg-slate-700 bg-opacity-70 fixed top-0 left-0 flex justify-center items-center"
  onClick={handleOverlayClick} // Handle overlay click
>
  <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6 relative">
    <div className="flex justify-between items-center border-b pb-3 mb-4">
      <h2 className="text-2xl font-bold text-gray-800">Create Content</h2>
      <button
        onClick={onClose} // Close the modal when clicking the Crossicon
        className="text-gray-500 hover:text-gray-700 transition"
        aria-label="Close modal"
      >
        <Crossicon />
      </button>
    </div>

    <div className="space-y-4">
      <Input reference={titleRef} placeholder="Enter a title" />
      <Input reference={linkRef} placeholder="Enter a link" />
    </div>

    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Type</h3>
      <div className="flex justify-center gap-4">
        <Button
          text="Youtube"
          variant={type === ContentType.Youtube ? "primary" : "secondary"}
          onClick={() => setType(ContentType.Youtube)}
        />
        <Button
          text="Twitter"
          variant={type === ContentType.Twitter ? "primary" : "secondary"}
          onClick={() => setType(ContentType.Twitter)}
        />
      </div>
    </div>

    <div className="mt-8 flex justify-center">
      <Button onClick={addContent} variant="primary" text="Submit" />
    </div>
  </div>
</div>

  );
}
