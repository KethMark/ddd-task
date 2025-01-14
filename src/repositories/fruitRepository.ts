import { Fruits } from "../adapter/dto/fruitDTO";
import { FruitDatabase } from "../infrastructure/database/fruitCrud/mongooseCrud";
import { FruitMapper } from "../mappers/fruitMappers";

export class FruitRepository {
  static async findFruit(name: string): Promise<Fruits | null> {
    const dbObject = await FruitDatabase.findOne({name})
    return dbObject ? FruitMapper.toDomain(dbObject) : null;
  }

  static async saveFruit(fruitDomain: Fruits): Promise<Fruits> {
    const dbObject = FruitMapper.toDatabase(fruitDomain);
    const savedFruit = await FruitDatabase.create(dbObject);
    return FruitMapper.toDomain(savedFruit);
  }

  static async updateFruit(
    name: string,
    updates: Partial<Fruits>
  ): Promise<Fruits | null> {
    const updatedFruit = await FruitDatabase.findOneAndUpdate({name}, updates, {new: true})
    return updatedFruit ? FruitMapper.toDomain(updatedFruit) : null;
  }

  static async deleteFruit(
    name: string,
    forceDelete: boolean
  ): Promise<boolean> {
    const fruitData = await FruitDatabase.findOne({ name });

    if (!fruitData) {
      throw new Error(`Fruit with name ${name} does not exist.`);
    }

    if (fruitData.amount > 0 && !forceDelete) {
      throw new Error(
        `Cannot delete ${name} because it has ${fruitData.amount} in storage.`
      );
    }

    if (forceDelete || fruitData.amount === 0) {
      await FruitDatabase.deleteOne({ name });
      return true;
    }

    await FruitDatabase.updateOne({ name }, { forceDelete: true });
    return true;
  }
}
