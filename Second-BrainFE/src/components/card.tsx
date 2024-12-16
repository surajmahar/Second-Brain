import { Shareicon } from "../icons/shareicon";
import { useEffect } from "react";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

export function Card({ title, link, type }: CardProps) {
  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type]);

  const getYoutubeEmbedLink = (youtubeLink: string) => {
    const match = youtubeLink.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/) 
      || youtubeLink.match(/(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : youtubeLink;
  };

  return (
    <div className="p-4 bg-white rounded-md border border-gray-300 max-w-72 min-h-48">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">
            <Shareicon />
          </div>
          {title}
        </div>

        <div className="flex items-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="pr-2 text-gray-500"
          >
            <Shareicon />
          </a>
        </div>
      </div>

      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full"
            src={getYoutubeEmbedLink(link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
