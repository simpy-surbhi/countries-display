import { Currency } from "./Currency";
import { Language } from "./Language";
import { Flag } from "./Flag";
export interface Country {
  name: string;
  capital: string;
  region: string;
  population: number;
  nativeName: string;
  subregion: string;
  topLevelDomain: string;
  currencies: Currency[];
  languages: Language[];
  borders?: string[];
  flags: Flag;
  cioc: string;
  flag: string;
}
