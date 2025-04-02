import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TypedRootState } from "../lib/store";
export const useTypedSelector: TypedUseSelectorHook<TypedRootState> = useSelector