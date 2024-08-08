import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

// 날짜 상태 인터페이스 정의
interface DateState {
    selectedDate: string;
};

// 초기 상태 정의
const initialState: DateState = {
    selectedDate: dayjs().format('YYYY-MM-DD'), //현재 날짜로 초기화
};

// 날짜 상태 슬라이스 생성
export const dateStore = createSlice({
    name: "date",
    initialState,
    reducers: {
        setSelectedDate: (state: { selectedDate: any; }, action: PayloadAction<string>) => {
            state.selectedDate = action.payload;
        },
    },
});

export const { setSelectedDate } = dateStore.actions;
export default dateStore.reducer;