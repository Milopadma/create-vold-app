import countryList from '~/data/country.json';

// Define types for country data
interface Country {
  name: string;
  dial_code: string;
  code: string;
}

// Function to create language to country code mapping
const createLangToCountryMap = (items: Country[]): Record<string, string> => {
  const map: Record<string, string> = {};
  items.forEach((item) => {
    map[item.code.toLowerCase()] = item.code; // Mapping lowercase country code to country code
  });
  return map;
};

// Function to get user country based on browser's localization settings
export const getUserCountry = (): string => {
  const langToCountryMap = createLangToCountryMap(countryList as Country[]);

  const userLang = navigator.language || navigator.languages[0];
  // Extract the language part of the locale (e.g., 'en-US' -> 'en')
  const langPart = userLang.split('-')[0].toLowerCase(); // Ensure lowercased language code
  const countryCode = langToCountryMap[langPart] || 'US'; // Default to 'US' if not found
  return countryCode;
};
