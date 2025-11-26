import { setNotification, clearNotification } from "./notificationReducer";

export const showNotification = (message, timeoutInSeconds = 5)=>{
    return async (dispatch) => {
        dispatch(setNotification(message))

        setTimeout(() => {
            dispatch(clearNotification())
        }, timeoutInSeconds * 1000);
    }
}