import {
  type TypedUseSelectorHook,
  useSelector,
  useDispatch,
} from "react-redux";
import type { RootState, AppDispatch } from "./store.ts";

// * Setting up custom hooks for using Redux
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
