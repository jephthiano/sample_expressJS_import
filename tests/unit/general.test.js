import '#config/env.js';
import { getEnvorThrow, isEmptyObject, isEmptyString, isValidData, replaceValues, inArray, ucFirst, isDateLapsed, parseMessageToObject } from '#main_util/general.util.js';

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
  test("should return true if the value is replaced and it matches expected result", () => {
    const result = replaceValues('what is name', ' ', '-');
    expect(result).toBe('what-is-name');
  });

  test("should return false if the value is replaced and does not match the old value", () => {
    const result = replaceValues('what is name', ' ', '-');
    expect(result).not.toBe('what is name');
  });
});


// ucFirst
describe("First Char of string to uppercase", () => {
  test("should return true if the first char is changed and it matches expected result", () => {
    const result = ucFirst('testing');
    expect(result).toBe('Testing');
  });

  test("should return false if the first char is changed and does not match the old value", () => {
    const result = ucFirst('testing');
    expect(result).not.toBe('testing');
  });
});



// isDateLapsed
describe("Check if the passed time has expired or not", () => {
  test("should return true if the given time has lapsed [Expired]", () => {
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
    const result = isDateLapsed(thirtySecondsAgo);
    expect(result).toBe(true);
  });

  test("should return true if the given time has not lapsed [Not Expired]", () => {
    const fiveSecondsPlus = new Date(Date.now() + 5 * 1000);
    const result = isDateLapsed(fiveSecondsPlus);
    expect(result).toBe(false);
  });

  test("should return true if the given time is less than expire time [Expired]", () => {
    expired = new Date()
    const OneSecondsAgo = new Date(Date.now() - 1 * 1000);
    const result = isDateLapsed(OneSecondsAgo, 0 , expired);
    expect(result).toBe(true);
  });

  test("should return true if the given time is greater than expire time [Not Expired]", () => {
    expired = new Date(Date.now() - 5 * 1000)
    const plusSecondsPlus = new Date(Date.now() - 4 * 1000);
    const result = isDateLapsed(plusSecondsPlus, 0, expired);
    expect(result).toBe(false);
  });
});



// parseMessageToObject

describe("Test that function can pass Joi Message into specified object", () => {
  test("should return true if function parses the data into the expected result", () => {
    const errorDetails = [
      { path: ["email"], message: "Email is required" },
      { path: ["username"], message: "Username must be at least 3 characters" },
      { path: ["password"], message: "Password is too weak" }
    ];

    const expected = {
      email: "Email is required",
      username: "Username must be at least 3 characters",
      password: "Password is too weak"
    };

    const result = parseMessageToObject(errorDetails);

    expect(result).toEqual(expected); // ✅ use toEqual, not toBe
  });
});
