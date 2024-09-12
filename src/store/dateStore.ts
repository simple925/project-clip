import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

// 날짜 상태 인터페이스 정의
interface DateState {
    selectedDate: string;
    currentDate: string;
};

// 초기 상태 정의
const initialState: DateState = {
    selectedDate: dayjs().format('YYYY-MM-DD'), //현재 날짜로 초기화
    currentDate: dayjs().format('YYYY-MM-DD'), //현재 날짜로 초기화
};

// 날짜 상태 슬라이스 생성
// 날짜 상태 슬라이스 생성
export const dateStore = createSlice({
    name: 'date',
    initialState,
    reducers: {
        // 선택된 날짜 설정
        setSelectedDate: (state, action: PayloadAction<string>) => {
            state.selectedDate = action.payload;
        },
        // 현재 날짜 설정 (필요시 추가)
        setCurrentDate: (state, action: PayloadAction<string>) => {
            state.currentDate = action.payload;
        },
    },
});

export const { setSelectedDate, setCurrentDate } = dateStore.actions;
export default dateStore.reducer;
