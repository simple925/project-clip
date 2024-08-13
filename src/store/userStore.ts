import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 로그인한 회원의 정보
interface UserState {
    userData: {};
};

// 초기 상태 정의
const initialState: UserState = {
    userData: {} // 로그인한 회원의 정보
};

// 날짜 상태 슬라이스 생성
export const userStore = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state: { userData: any; }, action: PayloadAction<string>) => {
            state.userData = action.payload;
        },
    },
});

export const { setUserData } = userStore.actions;
export default userStore.reducer;
