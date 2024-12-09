import { Sport } from './sport';

export interface Sportif {
  athleteId: string;
  birthDate: string;
  image: string;
  linkToPage: string;
  name: string;
  nationality: string;
}
export interface SportifFullDescription {
  birthDate: string;
  bornCity: string;
  bronzeMedals: string[];
  bronzeMedalsIds: string[];
  description: string;
  goldMedals: string[];
  goldMedalsIds: string[];
  height: number;
  image: string;
  listSports: string[];
  name: string;
  nbBronzeMedals: number;
  nbGoldMedals: number;
  nbSilverMedals: number;
  silverMedals: string[];
  silverMedalsIds: string[];
}
