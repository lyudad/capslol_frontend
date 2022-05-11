import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { AppDispatch } from "redux";
import { RootState } from "redux";
=======
import { AppDispatch, RootState } from "store";
>>>>>>> develop

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
