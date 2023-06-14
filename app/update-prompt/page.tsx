"use client";

import { FormEvent, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Form from "~/components/Form";

export type Prompt = {
  prompt?: string;
  tag?: string;
};

const EditPrompt = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState<Prompt | null>(null);

  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);

      const data = await response.json();

      setPrompt(data);
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const editPrompt = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      throw Error(`Unknown Prompt ID: ${promptId}`);
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: prompt?.prompt,
          tag: prompt?.tag,
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

  return <Form type="Edit" post={prompt} setPost={setPrompt} submitting={submitting} handleSubmit={editPrompt} />;
};

export default EditPrompt;
