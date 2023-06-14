import { connectToDB } from "~/utils/database";

import { PromptModel } from "~/models/prompt";

import { OK, INTERNAL_SERVER_ERROR } from "~/utils/http";

export const GET = async (req: Request, { params }) => {
  try {
    await connectToDB();

    const prompts = await PromptModel.find({ creator: params.id }).populate("creator");
    console.log("USER ONLY PROMPTS: ", prompts);

    return new Response(JSON.stringify(prompts), { status: OK });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: INTERNAL_SERVER_ERROR });
  }
};
