import {
  type TypedUseSelectorHook,
  useSelector,
  useDispatch,
} from "react-redux";
import type { RootState, AppDispatch } from "./store.ts";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
