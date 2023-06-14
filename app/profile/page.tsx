"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ProfilePrompt } from "~/components/Profile";

import Profile from "~/components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [prompts, setPrompts] = useState([]);

  const handleEdit = (prompt: ProfilePrompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt: ProfilePrompt) => {
    const hasConfirmed = confirm("Area you shure you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, { method: "DELETE" });

        const filteredPrompts = prompts.filter((p) => p._id !== prompt._id);

        setPrompts(filteredPrompts);
      } catch (error) {
        console.log("Error deleting prompt: ", error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();

      setPrompts(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      description="Welcome to your pesonalized profile page"
      prompts={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
