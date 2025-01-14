import { extendType, intArg, nonNull, stringArg } from "nexus";
import { FruitEvents } from "../../../infrastructure/events/fruitEvent";
import { FruitFactory } from "../../../domain/Factory/fruitFactory";
import { FruitRepository } from "../../../repositories/fruitRepository";

export const CreateFruitForFruitStorage = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createFruitForFruitStorage", {
      type: "Fruit",
      args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        limitOfFruitToBeStored: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        const fruit = FruitFactory.validateFruit(
          args.name,
          args.description,
          args.limitOfFruitToBeStored
        );
        const savedFruit = await FruitRepository.saveFruit(fruit);
        FruitEvents.emit("FruitedCreated", savedFruit);
        return savedFruit;
      },
    });
  },
});
