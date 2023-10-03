import { ICharacterData } from "@/types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharacterState {
  selectedCharacter: ICharacterData | null;
}

const initialState: CharacterState = {
  selectedCharacter: null,
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setSelectedCharacter(state, action: PayloadAction<ICharacterData>) {
      state.selectedCharacter = action.payload;
    },
  },
});

export const { setSelectedCharacter } = characterSlice.actions;
export default characterSlice.reducer;
