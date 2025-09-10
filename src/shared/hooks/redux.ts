import type { AppDispatch, RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useDispatch, type TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;