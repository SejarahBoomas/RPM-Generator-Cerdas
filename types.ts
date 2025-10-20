
export type ProfileDimensionKey =
  | 'keimanan dan ketakwaan'
  | 'kewargaan'
  | 'penalaran kritis'
  | 'kreativitas'
  | 'kolaborasi'
  | 'kemandirian'
  | 'kesehatan'
  | 'komunikasi';

export interface ProfileDimension {
  key: ProfileDimensionKey;
  label: string;
}

export interface FormData {
  identitas: string;
  jumlah_jam: number;
  tujuan: string;
  dimensi: ProfileDimensionKey[];
  topik: string;
  metode: string;
  digital: string;
}
