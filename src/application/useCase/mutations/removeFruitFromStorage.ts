import { extendType, intArg, nonNull, stringArg } from "nexus";
import { FruitEvents } from "../../../infrastructure/events/fruitEvent";
import { FruitRepository } from "../../../repositories/fruitRepository";

export const RemoveFruitFromFruitStorage = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("removeFruitFromFruitStorage", {
      type: "Fruit",
      args: {
        name: nonNull(stringArg()),
        amount: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        const fruit = await FruitRepository.findFruit(args.name);
        if (!fruit) throw new Error("Fruit not found");

        if (args.amount > fruit.amount) {
          throw new Error("Insufficient fruit in storage");
        }

        const newAmount = fruit.amount - args.amount;
        const updatedFruit = await FruitRepository.updateFruit(args.name, {
          amount: newAmount,
        });

        if (!updatedFruit) throw new Error("Failed to update fruit storage");

        FruitEvents.emit("FruitRemoved", updatedFruit);
        return updatedFruit;
      },
    });
  },
});
