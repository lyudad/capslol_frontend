import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux";
import { RootState } from "redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
