import "dotenv/config";

class UndefinedEnvironmentVariableError extends Error {}

const getEnvValue = (envName = "CHANNEL_ACCESS_TOKEN"): string => {
  const value = process.env[envName];
  if (value === undefined) {
    throw new UndefinedEnvironmentVariableError(`${envName} is undefined.`);
  }

  return value;
};

export default getEnvValue;
