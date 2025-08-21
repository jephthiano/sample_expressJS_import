import '#config/env.js';
import { getEnvorThrow, isEmptyObject, isEmptyString, isValidData, replaceValues, inArray } from '#main_util/general.util.js';

// getEncorThrow
describe("getEnvorThrow", () => {
  test("should throw error when env variable is missing", () => {

    expect(() => getEnvorThrow("UNKNOWN_KEY")).toThrow("Error occurred on the server");
  });

  test("should return env var when present", () => {

    expect(getEnvorThrow("TEST_KEY")).toBe("test-key");
  });
});


// isisEmptyObject
describe("Is Empty Object", () => {
  test("should return true for empty object", () => {
    const result = isEmptyObject({});
    expect(result).toBe(true);
  });

  test("should return false for non-empty object", () => {
    const result = isEmptyObject({ key: "value" });
    expect(result).toBe(false);
  });
});


// isEmptyString
describe("Is Empty String", () => {
  test("should return true for empty string", () => {
    const result = isEmptyString('');
    expect(result).toBe(true);
  });

  test("should return false for non-empty string", () => {
    const result = isEmptyString("value");
    expect(result).toBe(false);
  });
});


// isValidData
describe("Is Valid Data", () => {
  test("should return false for empty string", () => {
    const result = isValidData('');
    expect(result).toBe(false);
  });

  test("should return false for null", () => {
    const result = isValidData(null);
    expect(result).toBe(false);
  });

  test("should return false for undefined", () => {
    const result = isValidData(undefined);
    expect(result).toBe(false);
  });

  test("should return true for non-empty string", () => {
    const result = isValidData("value");
    expect(result).toBe(true);
  });

  test("should return true for array", () => {
    const result = isValidData(["value"]);
    expect(result).toBe(true);
  });

  test("should return true for Object", () => {
    const result = isValidData({key: "value"});
    expect(result).toBe(true);
  });
});


// inArray
describe("In Array", () => {
  test("should return true data is in array", () => {
    const result = inArray('name',['name', 'unknown']);
    expect(result).toBe(true);
  });

  test("should return false if data is not in array", () => {
    const result = inArray('value',['name', 'unknown']);
    expect(result).toBe(false);
  });
});


// replaceValues
describe("Replace Values", () => {
    test("should return false if the value is replaced and does not match the old value", () => {
    const result = replaceValues('what is name', ' ', '-');
    expect(result).toBe('what is name');
  });

  test("should return true if the value is replaced and it matches expected result", () => {
    const result = replaceValues('what is name', ' ', '-');
    expect(result).toBe('what-is-name');
  });
});


// ucFirst



// isDateLapsed



// parseMessageToObject