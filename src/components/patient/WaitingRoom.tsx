import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Grid from "@mui/material/Grid";
import Patient from "./Patient";
import Rooms from "../../components/rooms/Rooms";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import {
  patientState,
  getWaitingList,
  updateWaitingList,
  redoWaitingList,
} from "../../redux/patientSlice";
import {
  roomState,
  assignRoom,
  unassignPreviousPatient,
} from "../../redux/roomSlice";
import PatientList from "./PatientList";
import MaxHeap from "../../utils/heap/maxHeap";
import { PatientProp } from "../../shared/interfaces/patient";
import {
  cancelAlert,
  hideLoader,
  layoutState,
  showAlert,
  showLoader,
} from "../../redux/layoutSlice";
import { Room } from "../../shared/interfaces/room";

const defaultValues = {
  patient_id: null,
  roomAssigned: null,
};


const WaitingRoom: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { waitingList } = useAppSelector(patientState);
  const { rooms } = useAppSelector(roomState);
  const { isLoading, alertContinue } = useAppSelector(layoutState);
  const [patients, setPatients] = useState<PatientProp[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [selectedPatient, setSelectedPatient] = useState<PatientProp | undefined>();
  const [patient, setPatient] = useState<any>();
  const [vacantRooms, setVacantRooms] = useState<Room[]>([]);
  const [recentPatients, setRecentPatients] = useState<string[]>([])
  
  useEffect(() => {
    dispatch(getWaitingList());
  }, []); 

  useEffect(() => {
    const foundRooms = rooms?.filter(
      (room) => room?.occupant_id == null
    );
    foundRooms.sort((a, b) => a.room_number - b.room_number);
    setVacantRooms(foundRooms)
  }, [rooms]); 



  useEffect(() => {
    if (alertContinue){
      const lastAssigned =  recentPatients.pop()
      dispatch(unassignPreviousPatient(lastAssigned))
      dispatch(redoWaitingList(lastAssigned))
      dispatch(cancelAlert())
    } 
  }, [alertContinue]);
  
  const patientHeap = new MaxHeap();

  const getNextPatient = () => {
    const nextPatient = patientHeap.poll();
    setSelectedId(nextPatient?._id);
    handleSelectedPatient(nextPatient?._id);
    setPatient((prev: PatientProp) => ({
      ...prev,
      patient_id: nextPatient?._id,
    }));
  };

  useEffect(() => {
    setPatients(waitingList);
  }, [waitingList]);

  useEffect(() => {
    if (waitingList) {
      patientHeap.add(waitingList);
    }
  });

  const handleSelectedPatient = (id: string) => {
    const found = patients.find((patient: PatientProp) => patient?._id === id);
    setSelectedPatient(found);
  };

  const isNextPatientDisabled = (): boolean =>
    Boolean(patient?.patient_id || waitingList?.length < 1 || isLoading);

  const isAssignDisabled = (): boolean =>
    Boolean(!patient?.patient_id || !patient?.roomAssigned || isLoading);

  const showUndo = () => Boolean(recentPatients.length  || waitingList.length < 1)

  const handleRoom = (evt: SelectChangeEvent): void => {
    setPatient({ ...patient, roomAssigned: evt.target.value });
  };

  const handleAssignRoom = () => {
    const patientId = patient?.patient_id;
    dispatch(
      assignRoom({
        room_number: patient?.roomAssigned,
        occupant_id: patientId,
      })
    );
    setRecentPatients((prev => [...prev, patientId]))
    dispatch(updateWaitingList(patientId));
    dispatch(hideLoader());
  };

  const resetStates = () => {
    setSelectedId(undefined);
    setSelectedPatient(undefined);
    setPatient(defaultValues);
  };

  const handleSubmit = (evt: React.SyntheticEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(showLoader());
    setTimeout(() => handleAssignRoom(), 1000);
    resetStates();
  };

  const undoLastAssign = () => {
    dispatch(
      showAlert({
        message: "Undo assign room?",
        title: "UNDO",
        onOpen: true,
      })
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={5}
          columnSpacing={3}
        >
          <Grid item>
            <Typography
              variant="h5"
              sx={{
                textTransform: "uppercase",
              }}
            >
              (Select next patient to assign to a room)
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontStyle: "italic",
                marginLeft: "30%",
              }}
            >
              hover over room to see patient
            </Typography>
          </Grid>

          <Grid item>
            <FormControl variant="outlined" sx={{ minWidth: 250 }}>
              <InputLabel id="select" sx={{ textTransform: "uppercase" }}>
                room #
              </InputLabel>
              <Select
                sx={{ minWidth: 250 }}
                labelId="select"
                id="select"
                value={patient?.roomAssigned ?? ""}
                onChange={(evt) => handleRoom(evt)}
                label="Rooms"
                disabled={!selectedPatient?._id}
              >
                {vacantRooms?.map((room, idx) => {
                  return (
                    <MenuItem key={idx} value={room?.room_number}>
                      {room?.room_number}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <Button
              sx={{ textTransform: "uppercase" }}
              color="secondary"
              size="large"
              variant="contained"
              type="submit"
              disabled={isAssignDisabled()}
            >
              assign
            </Button>
          </Grid>
        </Grid>
      </form>

      <Grid
        container
        direction="row"
        alignItems="center"
        sx={{ marginTop: 5 }}
        columnSpacing={4}
      >
        <Grid item sx={{ ml: 2 }}>
          <Typography
            color="secondary.main"
            variant="h5"
            sx={{
              textTransform: "uppercase",
              textAlign: "center",
              fontWeight: "bolder",
            }}
          >
            {`waiting list (${patients?.length})`}
          </Typography>
          <PatientList waitingList={waitingList} selectedId={selectedId} />
        </Grid>

        <Grid container item direction="column" xs={3}>
          <Grid item mb={2}>
            <Button
              sx={{ textTransform: "uppercase", marginLeft: "30%" }}
              color="primary"
              disabled={isNextPatientDisabled()}
              size="large"
              variant="contained"
              onClick={() => getNextPatient()}
            >
              Next Patient
            </Button>
          </Grid>

          {selectedPatient?._id && (
            <Grid item>
              <Patient
                selectedPatient={selectedPatient}
                selectedId={selectedId}
              />
            </Grid>
          )}
        </Grid>

        <Grid item xs={7}>
          <Rooms />
        </Grid>
      </Grid>

      {showUndo() && (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Button
              sx={{
                textTransform: "uppercase",
                backgroundColor: theme.palette.secondary.light,
                marginTop: "20px",
              }}
              size="large"
              variant="contained"
              disabled={isLoading}
              onClick={() => undoLastAssign()}
            >
              UNDO ASSIGN
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default WaitingRoom;
