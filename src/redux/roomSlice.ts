import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRoomsService } from "../services";
import { Room } from "../shared/interfaces/room";
import { RootState } from "../redux/store";

interface RoomInitialState {
  rooms: Room[];
}

interface AssignRoomPayload {
  room_number: number;
  occupant_id: string;
}

const initialState: RoomInitialState = {
  rooms: [],
};

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {

    assignRoom: (state, action: PayloadAction<AssignRoomPayload>) => {
      const updatedRooms: Room[] = state.rooms.reduce(
        (results, currentRoom, index) => {
          if (currentRoom?.room_number === action?.payload.room_number) {
            results[index] = {
              ...currentRoom,
              occupant_id: action.payload.occupant_id,
            };
          }
          return results;
        },
        state.rooms
      );
      state.rooms = updatedRooms;
    },
    getRooms: (state) => {
      state.rooms = getRoomsService();
    },
    unassignPreviousPatient: (state, action: PayloadAction<string | undefined>) => {
      const rooms = state.rooms.reduce((results: Room[], currentRoom: Room) => {
        if (
          currentRoom?.occupant_id ===
          action.payload
        ) {
          delete currentRoom?.occupant_id;
        }
        results.push(currentRoom);
        return results;
      }, []);
      state.rooms = rooms;
    },
  },
});

export const {
  assignRoom,
  getRooms,
  unassignPreviousPatient,
} = roomSlice.actions;

export const roomState = (state: RootState) => state.rooms;
export default roomSlice.reducer;
