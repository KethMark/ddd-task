import { Fruits } from "../../../adapter/dto/fruitDTO";
import { fruitToDatabase, fruitToDomain } from "../models/dbFruit";

export class FruitDatabase {
  static async findOne(query: Object): Promise<Fruits | null> {
    return await fruitToDomain.findOne(query).lean()
  }

  static async create(data: Fruits): Promise<Fruits> {
    const savedFruit = await fruitToDatabase.create(data)
    return savedFruit.toObject()
  }

  static async findOneAndUpdate(
    query: Object,
    update: Partial<Fruits>,
    options: object = { new: true }
  ): Promise<Fruits | null> {
    return await fruitToDomain.findOneAndUpdate(query, update, options).lean()
  }

  static async deleteOne(query: object): Promise<void> {
    await fruitToDomain.deleteOne(query)
  }

  static async updateOne(query: object, updates: Partial<Fruits>): Promise<void> {
    await fruitToDomain.updateOne(query, updates)
  }
}