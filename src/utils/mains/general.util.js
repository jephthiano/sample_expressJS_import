import { triggerError} from '#core_util/handler.util.js';

const getEnvorThrow = (key) => {
    const val = process.env[key];
    if (!val) triggerError("Error occurred on the server", [], 500);
    
    return val;
}

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const isEmptyString = (variable) => typeof variable === 'string' && variable.trim().length === 0;

const isValidData = (data) => !(data === undefined || data === null || data === '');

const inArray = (value, array) => array.includes(value);

const replaceValues = (data, value, replace) => {
    const regex = new RegExp(value, 'g');
    return data.replace(regex, replace);
};

const ucFirst = (data) => data.charAt(0).toUpperCase() + data.slice(1);

const isDateLapsed = (givenDate, duration = 0, checkDate = new Date()) => {
    // return true if date has expired
    const milliDuration = 1000 * duration;
    return new Date(givenDate).getTime() + milliDuration < checkDate.getTime();
};

const parseMessageToObject = (errorDetails) => {
    const errors = errorDetails.reduce((acc, err) => {
        acc[err.path[0]] = err.message; // Assign each field's error message
        return acc;
    }, {});
    
    return errors; // Return the structured errors as an object
};



// const isEmptyArray = (array) => Array.isArray(array) && array.length === 0;

// const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

// const isKeyInObject = (key, object) => Object.prototype.hasOwnProperty.call(object, key);

// const isValidString = (variable) => typeof variable === 'string' && variable.trim().length > 0;


// const isNumber = (value) => !isNaN(value) && typeof Number(value) === "number" && Number.isFinite(value);

export {
    getEnvorThrow,
    isEmptyObject,
    isEmptyString,
    isValidData,
    replaceValues,
    inArray,
    ucFirst,
    isDateLapsed,
    parseMessageToObject,
};
