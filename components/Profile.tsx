import { FC } from "react";

import { Prompt } from "~/models/prompt";

import PromptCard from "./PromptCard";

export type ProfilePrompt = {
  _id: string;
} & Prompt;

type Props = {
  name: string;
  description: string;
  prompts: ProfilePrompt[];
  handleEdit: (prompt: ProfilePrompt) => void;
  handleDelete: (prompt: ProfilePrompt) => void;
};

const Profile: FC<Props> = ({ name, description, prompts, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{description}</p>

      <div className="mt-10 prompt_layout">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={() => {
              if (handleEdit) {
                handleEdit(prompt);
              }
            }}
            handleDelete={() => {
              if (handleDelete) {
                handleDelete(prompt);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
