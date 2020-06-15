'use strict';

const joi = require('joi');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    BOT_TOKEN: joi.string().required(),
    STORAGE_CHAT: joi.number().required(),
    URL: joi.string().required(),
    API_VERSION: joi.number(),
    STORAGE_PREFIX: joi.string(),
    BOT_PASSWORD: joi.string(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */

const { error, value: envVars } = joi.validate(process.env, envSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  storageBot: {
    token: envVars.BOT_TOKEN,
    storageChat: envVars.STORAGE_CHAT,
    password: envVars.BOT_PASSWORD || 'bot',
    prefix: envVars.STORAGE_PREFIX || 'storage',
    webHook: `${envVars.URL}/api/${envVars.API_VERSION ||
      'v1'}/${envVars.STORAGE_PREFIX || 'storage'}/${envVars.BOT_PASSWORD ||
      'bot'}`,
    fileLink: `${envVars.URL}/api/${envVars.API_VERSION ||
      'v1'}/${envVars.STORAGE_PREFIX || 'storage'}`,
  },
};

module.exports = config;
