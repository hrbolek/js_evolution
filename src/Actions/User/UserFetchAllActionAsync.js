import { actions } from "../../Store";
import { authorizedFetch, buildPayload } from "../authorizedFetch";


const BuildQueryUserFetchAll = () => {
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

export const UserFetchAllActionAsync = () => async (dispatch, getState) => {
    const payload = BuildQueryUserFetchAll()
    const json = await authorizedFetch(payload)
    
    const jsondata = json.data
    const users = jsondata.result
    users.forEach(
        user => {
            const action = actions.UpdateItem(user)
            dispatch(action)
        }
    );
    return jsondata
}