import { fruitToDomain, fruitToDatabase } from "../../infrastructure/database/models/dbFruit";

export interface Context {
  fruitToDomain: typeof fruitToDomain;
  fruitToDatabase: typeof fruitToDatabase;
}

export const context = {
  fruitToDomain,
  fruitToDatabase
};
