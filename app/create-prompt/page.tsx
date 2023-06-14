"use client";

import { FormEvent, useState } from "react";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

import Form from "~/components/Form";

export type Post = {
  prompt?: string;
  tag?: string;
};

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  const createPrompt = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post?.prompt,
          userId: session?.user.id,
          tag: post?.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error creating prompt: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />;
};

export default CreatePrompt;
