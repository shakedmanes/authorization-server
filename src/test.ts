import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';
import config from './config';

/**
 * Deletes all collections in the db
 */
export const deleteCollections = async () => {
  const deletePromises = [];

  for (const index in mongoose.connection.collections) {
    deletePromises.push(mongoose.connection.collections[index].remove({}));
  }

  await Promise.all(deletePromises);
};

/**
 * Dismantle object into nested properties for chai nested assertion
 * @param prop - Property name to apply properties on
 * @param obj - Object to apply properties from
 */
export const dismantleNestedProperties = (prop: string, obj: any) => {

  const destructiveObj: any = {};

  for (const key of Object.keys(obj)) {

    if (Array.isArray(obj[key])) {
      for (let index = 0; index < obj[key].length; index += 1) {
        destructiveObj[`${prop}.${key}[${index}]`] = obj[key][index];
      }

    } else {
      destructiveObj[`${prop}.${key}`] = obj[key];
    }
  }

  return destructiveObj;
};

/**
 * Lowercase properties values in object.
 * [Supported for property containing strings or array of strings]
 * @param props - Array of properties names
 * @param obj - Object containing the properties to apply on
 */
export const lowerCasePropertiesValues = (props: string[], obj: any) => {

  for (const prop of props) {

    // If the property is array
    if (Array.isArray(obj[prop])) {
      for (let index = 0; index < obj[prop].length; index += 1) {
        obj[prop][index] = obj[prop][index].toLowerCase();
      }
    } else if (typeof obj[prop] === 'string') { // If the property is string
      obj[prop] = obj[prop].toLowerCase();
    }
  }

  return obj;
};

/**
 * Gets property name from interface safely with type checking.
 * @param name - name of the property
 */
export const propertyOf = <T>(name: keyof T) => name;

// Runs before all the test cases for global configuration
before(async () => {

  if (process.env.NODE_ENV !== 'test') {
    console.log('\x1B[31m WARNING:\x1B[0m Invalid node environment when running tests.');
    process.exit();
  }

  // Use chai as promised syntax in all tests
  chai.use(chaiAsPromised);

  try {
    await mongoose.connect(config.mongoUrl);
    console.log('[*] MongoDB Connection Established [*]');
    await deleteCollections();
    console.log('[*] Deleted all collections found [*]');
  } catch (err) {
    console.error(err);
    process.exit();
  }
});

after(async () => {
  await mongoose.disconnect();
});