import { objectType } from "nexus";

export const Fruit = objectType({
  name: "Fruit",
  definition(t) {
    t.string("name"),
    t.int("amount"),
    t.string("description"),
    t.int("limitOfFruitToBeStored"),
    t.boolean("forceDelete");
  },
});

export *  from './mutations/createFruitForStorage';
export *  from './mutations/storeFruitToStorage';
export *  from './mutations/updateFruitForStorage';
export *  from './mutations/deleteFruitFromStorage';
export *  from './mutations/removeFruitFromStorage';
export *  from './queries/findFruit'