import mongoose from "mongoose";

import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true, unique: true })
  public image!: string;
}

export const UserModel = mongoose.models.User ?? getModelForClass(User);
