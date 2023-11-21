import { actions } from "../../Store"
import { buildPayload, authorizedFetch } from "../authorizedFetch"

const BuildQueryUserDelete = (user) => {
    return buildPayload({
        query: `{
            result: userPage {
              __typename
              id
              name
              surname
              email
            }
          }`
    })
}

export const UserDeleteActionAsync = (user) => (dispatch, getState) => {
    
    dispatch(actions.DeleteItem(user))
}