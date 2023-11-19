import { actions } from "../../Store"
export const UserDeleteActionAsync = (user) => (dispatch, getState) => {
    
    dispatch(actions.DeleteItem(user))
}