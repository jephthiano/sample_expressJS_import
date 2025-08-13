import User from '#model/User.schema.js';
import Otp from '#src/models/Otp.schema.js';
import Token from '#model/Token.schema.js';
import { triggerError} from '#core_util/handler.util.js';

const findSingleValue = async (collectionName, whereField, whereValue, selectValue) => {
    const model = getModel(collectionName); // Get model dynamically
    if (!model) triggerError(`Error occurred on the server`,[], 500);

    const result = await model.findOne({ [whereField]: param }, selectValue);
    const response = result ? result[select] : null;

    return response;
};

const updateSingleField = async (collectionName, whereField, whereValue, updateField, newValue) => {
    const model = getModel(collectionName); // dynamically resolve the Mongoose model
    if (!model) triggerError(`Error occurred on the server`,[], 500);

    const result = await model.updateOne(
    { [whereField]: whereValue },
    { $set: { [updateField]: newValue } }
    );

    return result.modifiedCount > 0;
};

const getModel = (modelName) => {
    const models = { User, Otp, Token }; // Add other models here
    return models[modelName] || null;
};

export { findSingleValue, updateSingleField };