import { extendType, intArg, nonNull, stringArg } from "nexus";
import { FruitEvents } from "../../../infrastructure/events/fruitEvent";
import { FruitFactory } from "../../../domain/Factory/fruitFactory";
import { FruitRepository } from "../../../repositories/fruitRepository";

export const UpdateFruitForFruitStorage = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateFruitForFruitStorage", {
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

        const { description, limitOfFruitToBeStored } = fruit;

        const updatedFruit = await FruitRepository.updateFruit(args.name, {
          description,
          limitOfFruitToBeStored,
        });
        if (!updatedFruit) throw new Error("Fruit not Found");
        FruitEvents.emit("fruitUpdated", updatedFruit);
        return updatedFruit;
      },
    });
  },
});
