import { connectToDB } from "~/utils/database";

import { PromptModel } from "~/models/prompt";

import { CREATED, INTERNAL_SERVER_ERROR } from "~/utils/http";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = new PromptModel({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: CREATED });
  } catch (error) {
    console.log("Error saving Prompt: ", error);
    return new Response("Error saving Prompt", { status: INTERNAL_SERVER_ERROR });
  }
};
