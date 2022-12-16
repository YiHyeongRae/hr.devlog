import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initialState 타입 정의
export interface ModalType {
  modalState: number;
}
// initialState 생성
const initialState: ModalType = {
  modalState: 0,
};

// slice 생성
const EasterEggSlice = createSlice({
  name: "modal-check",
  initialState,
  reducers: {
    // action의 타입은 PayloadAction<제네릭> 으로 지정해준다.
    modalCounter: (state: ModalType, action: PayloadAction<number>) => {
      state.modalState = action.payload;
    },
  },
});

// Action 익스포트
export const { modalCounter } = EasterEggSlice.actions;

// slice 익스포트
export default EasterEggSlice;
