import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 로그인한 회원의 UUID를 저장하는 상태
interface MemberState {
    memberData: string;
};

// 초기 상태 정의
const initialState: MemberState = {
    memberData: "" // 로그인한 회원의 정보
};

// 날짜 상태 슬라이스 생성
export const memberStore = createSlice({
    name: "member",
    initialState,
    reducers: {
        setMemberData: (state: MemberState, action: PayloadAction<string>) => {
            state.memberData = action.payload;
        },
    },
});

export const { setMemberData } = memberStore.actions;
export default memberStore.reducer;
