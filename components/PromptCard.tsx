"use client";

import { FC, useState } from "react";

import Image from "next/image";

import { useSession } from "next-auth/react";

import { usePathname, useRouter } from "next/navigation";

import { ProfilePrompt } from "./Profile";

import { Prompt } from "~/models/prompt";

export type Props = {
  prompt: Prompt;
  handleTagClick: (tag: string) => void;
};

const PromptCard: FC<Props> = ({ prompt, handleTagClick }) => {
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    // Reset state after 3 seconds
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image}
            width={40}
            height={40}
            className="rounded-full object-contain"
            alt="user image"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{prompt.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{prompt.creator.email}</p>
          </div>
        </div>

        <div onClick={handleCopy} className="copy_btn">
          <Image
            src={`/assets/icons/${copied === prompt.prompt ? "tick" : "copy"}.svg`}
            width={12}
            height={12}
            alt="Copy Prompt"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {
          if (handleTagClick) {
            handleTagClick(prompt.tag);
          }
        }}
      >
        {prompt.tag}
      </p>
    </div>
  );
};

export default PromptCard;
