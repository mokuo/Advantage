import "dotenv/config";

class UndefinedEnvironmentVariableError extends Error {}

const getEnvValue = (envName: string, defaultValue?: string): string => {
  const value = process.env[envName];

  if (value) {
    return value;
  }

  if (defaultValue) {
    return defaultValue;
  }

  throw new UndefinedEnvironmentVariableError(`${envName} is undefined.`);
};

export default getEnvValue;
