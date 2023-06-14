import { connectToDB } from "~/utils/database";

import { PromptModel } from "~/models/prompt";

import { OK, INTERNAL_SERVER_ERROR } from "~/utils/http";

export const GET = async (req: Request) => {
  try {
    await connectToDB();

    const prompts = await PromptModel.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: OK });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: INTERNAL_SERVER_ERROR });
  }
};
