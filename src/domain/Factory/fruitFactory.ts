import { FruitMapper } from "../../mappers/fruitMappers";

export class FruitFactory {
  static validateFruit(
    name: string,
    description: string,
    limitOfFruitToBeStored: number
  ) {
    if (description.length > 30) {
      throw new Error("The description of a fruit can't be beyond 30 letters");
    }

    const fruit = {
      name,
      description,
      limitOfFruitToBeStored,
      amount: 0,
      forceDelete: false,
    };

    return FruitMapper.toDomain(fruit);
  }
}