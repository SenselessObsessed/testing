import validateCard from "../validateCardNum";

test.each([
  ["true for valid card", "371449635398431", true],
  ["true for valid card", "30569309025904", true],
  ["true for valid card", "6011111111111117", true],
  ["true for valid card", "3530111333300000", true],
  ["true for valid card", "5555555555554444", true],
  ["true for valid card", "4111111111111111", true],

  ["false for invalid card", "411111111111111", false],
  ["false for invalid card", "411111111111111111", false],
])("it should be %s", (_, input, expected) => {
  expect(validateCard(input)).toBe(expected);
});
