import {PatientProp} from "../shared/interfaces/patient"

import patientData from "../data/patients" 
import roomData from "../data/rooms" 
import { Room } from "../shared/interfaces/room"

export const getPatientsService = (): PatientProp[] => patientData
export const getRoomsService = (): Room[]  => roomData

