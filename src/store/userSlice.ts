import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState} from "../types/types.ts";

const initialState: UserState = {
    developerId: null,
    username: null,
    devToken: null,
    active: false,
    createdAt: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.developerId = action.payload.developerId;
            state.username = action.payload.username;
            state.devToken = action.payload.devToken;
            state.active = action.payload.active;
            state.createdAt = action.payload.createdAt;
        },
        clearUser: (state) => {
            state.developerId = null;
            state.username = null;
            state.devToken = null;
            state.active = false;
            state.createdAt = null;
        },
    },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;