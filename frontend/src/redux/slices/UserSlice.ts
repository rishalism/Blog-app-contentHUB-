import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interface/UserInterface";


const IsUserDataStored = localStorage.getItem('userData');

interface Authstate {
    UserInfo: IUser | null
}

const initialState: Authstate = {
    UserInfo: IsUserDataStored ? JSON.parse(IsUserDataStored) : null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ data: IUser, accessToken: string }>) => {
            state.UserInfo = action.payload.data
            localStorage.setItem('userData', JSON.stringify(action.payload.data))
            localStorage.setItem("accessToken", action.payload.accessToken);
        },
        clearUser: (state) => {
            state.UserInfo = null
            localStorage.removeItem('userData')
            localStorage.removeItem("accessToken")
        },
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;