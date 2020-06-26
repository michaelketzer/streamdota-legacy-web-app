import { CALL_API } from "../middleware/NetworkMiddlewareTypes";
import { loadCurrentUser } from "./Ui";
import { AUTH_USER_REQUEST, AUTH_USER_SUCCESS, AUTH_USER_FAILURE } from "./Actions";
import { currentUserSelector } from "../selector/Ui";


export function authUser(code: string) {
    return async (dispatch, getState) => {
        if(!currentUserSelector(getState())) {
            const jwt = await dispatch({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/auth/twitch/callback?code=${code}`,
                    headers: { 'Content-Type': 'text/html' },
                    types: {
                        requestType: AUTH_USER_REQUEST,
                        successType: AUTH_USER_SUCCESS,
                        failureType: AUTH_USER_FAILURE,
                    },
                },
            });
            console.log(jwt);
            debugger;
            if(jwt) {
                localStorage.setItem('jwt', jwt);
                await dispatch(loadCurrentUser());
                return true;
            }
        }

        return false;
    }
}
