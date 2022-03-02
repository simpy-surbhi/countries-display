const env = process.env;

export const Config = {
  API_BASE_URL: env.REACT_APP_API_BASE_URL || "https://restcountries.com/v2",
};
