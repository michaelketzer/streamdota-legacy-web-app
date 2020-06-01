import { State } from "../Store";
import { User } from "@streamdota/shared-types";


export const currentUserSelector = (state: State): User | null => state.ui.currentUser;