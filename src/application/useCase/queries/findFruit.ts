import { extendType, nonNull, stringArg } from "nexus";
import { FruitRepository } from "../../../repositories/fruitRepository";

export const FindFruit = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("findFruit", {
      type: "Fruit",
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const fruit = await FruitRepository.findFruit(args.name);
        if(!fruit) throw new Error("Fruit not found");
        return fruit
      },
    });
  },
});