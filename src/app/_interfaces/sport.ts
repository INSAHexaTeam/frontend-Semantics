import { Sportif } from './sportif';

export interface Sport {
  nom: string;
  type: string;
  dateCreation: Date;
  sportifs: Sportif[];
}
