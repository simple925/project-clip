import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

// 날짜 상태 인터페이스 정의
interface DateState {
  selectedDate: string; // 선택된 날짜 (YYYY-MM-DD 형식)
};

// 초기 상태 설정
const initialState: DateState = {
  selectedDate: dayjs().format('YYYY-MM-DD'), // 현재 날짜로 초기화 
};

// 날짜 상태 슬라이스 생성
export const dateStore = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = dateStore.actions;
export default dateStore.reducer;
