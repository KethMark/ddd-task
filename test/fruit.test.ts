import { FruitFactory } from "../src/domain/Factory/fruitFactory";
import { FruitMapper } from "../src/mappers/fruitMappers";

jest.mock("../src/mappers/fruitMappers");

describe("FruitFactory", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("validateFruit", () => {
    it("should create a valid fruit object and map it to the domain", () => {
      const mockFruit = {
        name: "Banana",
        description: "A tasty fruit",
        limitOfFruitToBeStored: 100,
        amount: 0,
        forceDelete: false,
      };

      (FruitMapper.toDomain as jest.Mock).mockReturnValue(mockFruit);

      const result = FruitFactory.validateFruit(
        "Banana",
        "A tasty fruit",
        100
      );

      expect(FruitMapper.toDomain).toHaveBeenCalledWith(mockFruit);
      expect(result).toEqual(mockFruit);
    });

    it("should throw an error if the description length exceeds 30 characters", () => {
      const longDescription = "This is a very long description exceeding 30 characters";

      expect(() =>
        FruitFactory.validateFruit("Apple", longDescription, 50)
      ).toThrow("The description of a fruit can't be beyond 30 letters");

      expect(FruitMapper.toDomain).not.toHaveBeenCalled();
    });

    it("should set default values for amount and forceDelete", () => {
      const mockFruit = {
        name: "Grapes",
        description: "Small and sweet",
        limitOfFruitToBeStored: 200,
        amount: 0,
        forceDelete: false,
      };

      (FruitMapper.toDomain as jest.Mock).mockReturnValue(mockFruit);

      const result = FruitFactory.validateFruit(
        "Grapes",
        "Small and sweet",
        200
      );

      expect(FruitMapper.toDomain).toHaveBeenCalledWith(mockFruit);
      expect(result.amount).toBe(0);
      expect(result.forceDelete).toBe(false);
    });
  });
});
