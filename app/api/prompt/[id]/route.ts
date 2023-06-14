import { connectToDB } from "~/utils/database";

import { PromptModel } from "~/models/prompt";

import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from "~/utils/http";

export const GET = async (req: Request, { params }) => {
  try {
    await connectToDB();

    const prompt = await PromptModel.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: NOT_FOUND });
    }

    return new Response(JSON.stringify(prompt), { status: OK });
  } catch (error) {
    return new Response(`Failed to fetch prompt with ID: ${params.id}`, { status: INTERNAL_SERVER_ERROR });
  }
};

export const PATCH = async (req: Request, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await PromptModel.findById(params.id).populate("creator");

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: NOT_FOUND });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: OK });
  } catch (error) {
    return new Response(`Failed to update prompt with ID: ${params.id}`, { status: INTERNAL_SERVER_ERROR });
  }
};

export const DELETE = async (req: Request, { params }) => {
  try {
    await connectToDB();

    await PromptModel.findByIdAndRemove(params.id);

    return new Response("Prompt successfully deleted", { status: OK });
  } catch (error) {
    return new Response(`Failed to delete prompt with ID: ${params.id}`, { status: INTERNAL_SERVER_ERROR });
  }
};
