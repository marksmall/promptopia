import { ChangeEvent } from "react";

const PromptCardList = () => {
  return <div className="mt-16 prompt_layout"></div>;
};

const Feed = () => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {};

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList />
    </section>
  );
};

export default Feed;
