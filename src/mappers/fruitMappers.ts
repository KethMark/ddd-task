import { Fruits } from "../adapter/dto/fruitDTO";

export class FruitMapper {
  static toDomain(dbObject: Fruits): Fruits {
    return {
      name: dbObject.name,
      description: dbObject.description,
      limitOfFruitToBeStored: dbObject.limitOfFruitToBeStored,
      amount: dbObject.amount,
      forceDelete: dbObject.forceDelete,
    };
  }

  static toDatabase(domainObject: Fruits): Fruits {
    return {
      name: domainObject.name,
      description: domainObject.description,
      limitOfFruitToBeStored: domainObject.limitOfFruitToBeStored,
      amount: domainObject.amount,
      forceDelete: domainObject.forceDelete,
    };
  }
}
