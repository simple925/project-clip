import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 로그인한 회원의 계정 UUID를 저장하는 상태
interface AccountState {
    accountData: string;
};

// 초기 상태 정의
const initialState: AccountState = {
    accountData: "" // 로그인한 회원의 계정 UUID
};

// 계정 uuid 정보 슬라이스 생성
export const accountStore = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccountData: (state: AccountState, action: PayloadAction<string>) => {
            state.accountData = action.payload;
        },
    },
});

export const { setAccountData } = accountStore.actions;
export default accountStore.reducer;