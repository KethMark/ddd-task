import { booleanArg, extendType, nonNull, stringArg } from "nexus";
import { FruitEvents } from "../../../infrastructure/events/fruitEvent";
import { FruitRepository } from "../../../repositories/fruitRepository";

export const DeleteFruitFromFruitStorage = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteFruitFromFruitStorage", {
      type: "Fruit",
      args: {
        name: nonNull(stringArg()),
        forceDelete: nonNull(booleanArg()),
      },
      async resolve(_root, args, ctx) {
        const success = await FruitRepository.deleteFruit(
          args.name,
          args.forceDelete
        );
        if (success) {
          FruitEvents.emit("FruitDeleted", { name: args.name });
        }
        return { name: args.name, forceDelete: args.forceDelete };
      },
    });
  },
});
