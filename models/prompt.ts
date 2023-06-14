import mongoose from "mongoose";

import { getModelForClass, prop } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";

import { User } from "./user";

export class Prompt {
  @prop({ type: mongoose.Types.ObjectId, ref: () => User })
  public creator!: Ref<User>;

  @prop({ required: true })
  public prompt!: string;

  @prop({ required: true, unique: true })
  public tag!: string;
}

export const PromptModel = mongoose.models.Prompt ?? getModelForClass(Prompt);
