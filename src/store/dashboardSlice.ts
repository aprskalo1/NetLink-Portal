import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DashboardState {
    activeContainer: "endUsers" | "sensors" | "groups";
    selectedEndUserId: string | null;
}

const initialState: DashboardState = {
    activeContainer: "endUsers",
    selectedEndUserId: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setActiveContainer: (state, action: PayloadAction<"endUsers" | "sensors" | "groups">) => {
            state.activeContainer = action.payload;
        },
        setSelectedEndUserId: (state, action: PayloadAction<string | null>) => {
            state.selectedEndUserId = action.payload;
        },
    },
});

export const {setActiveContainer, setSelectedEndUserId} = dashboardSlice.actions;
export default dashboardSlice.reducer;