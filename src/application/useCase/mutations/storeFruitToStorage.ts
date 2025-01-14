import { extendType, intArg, nonNull, stringArg } from "nexus";
import { FruitEvents } from "../../../infrastructure/events/fruitEvent";
import { FruitRepository } from "../../../repositories/fruitRepository";

export const StoreFruitToFruitStorage = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("storeFruitToFruitStorage", {
      type: "Fruit",
      args: {
        name: nonNull(stringArg()),
        amount: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        const fruit = await FruitRepository.findFruit(args.name);
        if (!fruit) throw new Error("Fruit not found");

        const newAmount = fruit.amount + args.amount;
        if (newAmount > fruit.limitOfFruitToBeStored) {
          throw new Error("Exceeds storage limit");
        }

        const updatedFruit = await FruitRepository.updateFruit(args.name, {
          amount: newAmount,
        });

        if (!updatedFruit) throw new Error("Failed to update fruit storage");

        FruitEvents.emit("FruitStored", updatedFruit);
        return updatedFruit;
      },
    });
  },
});
