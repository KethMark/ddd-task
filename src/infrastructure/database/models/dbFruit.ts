import { Schema, model } from "mongoose";
import { Fruits } from "../../../adapter/dto/fruitDTO";

export const fruitStorageDomain = new Schema<Fruits>({
  name: { type: String, unique: true },
  amount: { type: Number },
  description: { 
    type: String, 
    validate: {
      validator: (v: string) => v.length <= 30,
      message: "The description of a fruit can't be beyond 30 letters"
    } },
  limitOfFruitToBeStored: { type: Number },
  forceDelete: { type: Boolean },
});

export const fruitToDomain = model<Fruits>("FruitStorageDomain", fruitStorageDomain);

export const fruitStorageDatabase = new Schema<Fruits>({
  name: { type: String, unique: true },
  amount: { type: Number },
  description: { 
    type: String, 
    validate: {
      validator: (v: string) => v.length <= 30,
      message: "The description of a fruit can't be beyond 30 letters"
    } },
  limitOfFruitToBeStored: { type: Number },
  forceDelete: { type: Boolean },
});

export const fruitToDatabase = model<Fruits>("FruitStorageDatabase", fruitStorageDatabase);