
export enum TreatmentType {
  CONFORT_INTIME = 'CONFORT_INTIME',
  HYDRATATION = 'HYDRATATION',
  CONFORT_URINAIRE = 'CONFORT_URINAIRE',
  SUIVI = 'SUIVI'
}

export interface BluetoothDeviceState {
  connected: boolean;
  battery: number;
  name: string | null;
}

export interface TreatmentSession {
  id: string;
  type: TreatmentType;
  date: string;
  durationMinutes: number;
  intensity: number;
}
