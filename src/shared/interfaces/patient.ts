export interface PatientProp {
  _id: string;
  first_name: string;
  last_name: string;
  insurance_number: number;
  admission?: string;
  discharge?: string | null;
  medical_history: string[];
  care_level: number;
  occupant_id?: string
}
