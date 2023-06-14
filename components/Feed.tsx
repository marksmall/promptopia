"use client";

import { FC, ChangeEvent, useEffect, useState } from "react";
import { Prompt } from "~/models/prompt";
import PromptCard from "./PromptCard";

export type Props = {
  prompts: Prompt[];
  handleTagClick: (tag: string) => void;
};

const PromptCardList: FC<Props> = ({ prompts, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {prompts.map((prompt) => (
        <PromptCard key={prompt._id} prompt={prompt} handleTagClick={() => handleTagClick(prompt.tag)} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Prompt[] | null>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPrompts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {}, [searchText]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);

    const filteredPrompts = filterPrompts(event.target.value);

    setSearchResults(filteredPrompts);
  };

  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, "i");

    const filteredPrompts = prompts.filter(
      (prompt) => regex.test(prompt.creator.username) || regex.test(prompt.tag) || regex.test(prompt.prompt)
    );

    return filteredPrompts;
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);

    const filteredByTag = filterPrompts(tag);

    setSearchResults(filteredByTag);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList prompts={searchResults ?? prompts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
