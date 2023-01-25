
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Circle } from "react-shapes";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { roomState, getRooms } from "../../redux/roomSlice";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import {Room} from "../../shared/interfaces/room"
import { patientState } from "../../redux/patientSlice";

 // @ts-ignore
const CustomToolTip = styled(({ className, ...props }) => (
  //  @ts-ignore
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 16,
  },
}));

const roomOccupiedColor = "#b256c2";

interface AllRooms {
  even: Room[]; 
  odd: Room[];
} 

const Rooms: React.FC = () => {
  const dispatch = useAppDispatch();
  const { rooms } = useAppSelector(roomState)
  const { patients } = useAppSelector(patientState)

  useEffect(() => {
     dispatch(getRooms())
  }, []);

  const isRoomOccupied = (status: string| undefined) => (status ? "#c51162" : "none");

  const allRooms = rooms?.reduce((result: AllRooms, currentRoom: Room) => {
    if (currentRoom?.room_number % 2 === 0){
      result["even"].push(currentRoom)
    } else {
      result["odd"].push(currentRoom)
    }
    return result
  }, {even: [] , odd: []})

  const getPatientFullName = (occupantId: string | undefined): string => {
      const foundPatient =  patients.find(patient => patient._id === occupantId)
    if (foundPatient){
      return `${foundPatient.first_name ?? ''} ${foundPatient.last_name ?? ''}`
    }
    return ""
  } 
    

  return (
    <>
      <Typography
        variant="h5"
        color="primary"
        sx={{
          textAlign: "center",
          fontWeight: "bolder",
          textTransform: "uppercase",
        }}
      >
        rooms
      </Typography>
      <Paper elevation={15}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid id="l-stay" item xs={5} container direction="column">
            <Grid item>
              <Typography
                variant="h6"
                color="primary"
                sx={{
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                long stay
              </Typography>
            </Grid>

            <Grid item container>
              {allRooms?.even?.map((room: Room, idx: number) => {
                  return (
                    //  @ts-ignore
                    <CustomToolTip
                      key={idx}
                      title={getPatientFullName(room?.occupant_id)}
                      placement="bottom-end"
                    >
                      <Grid key={idx} item xs={2} sx={{ margin: "16px 32px" }}>
                        <Typography variant="h6" sx={{ textAlign: "center" }}>
                          {room?.room_number}
                        </Typography>

                        <Circle
                          style={{ padding: "0px !important" }}
                          fill={{ color: isRoomOccupied(room?.occupant_id) }}
                          stroke={{ color: roomOccupiedColor }}
                          strokeWidth={5}
                          r={20}
                        />
                      </Grid>
                    </CustomToolTip>
                  );
                })}
            </Grid>
          </Grid>

          <Grid id="s-stay" container item direction="column" xs={5}>
            <Grid item>
              <Typography
                variant="h6"
                color="primary"
                sx={{
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                short stay
              </Typography>
            </Grid>
            <Grid item container>
              {allRooms?.odd.map((room: Room, idx: number) => {
                  return (
                    // @ts-ignore
                    <CustomToolTip
                      key={idx}
                      title={getPatientFullName(room?.occupant_id)}
                      placement="bottom-end"
                      style={{ fontSize: 24 }}
                    >
                      <Grid
                        key={idx}
                        item
                        xs={2}
                        style={{ margin: "16px 32px" }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {room?.room_number}
                        </Typography>

                        <Circle
                          style={{ padding: "0px !important" }}
                          fill={{ color: isRoomOccupied(room?.occupant_id) }}
                          stroke={{ color: roomOccupiedColor }}
                          strokeWidth={5}
                          r={20}
                        />
                      </Grid>
                    </CustomToolTip>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Rooms;
