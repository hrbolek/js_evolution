import { actions } from "../../Store"
import { buildPayload, authorizedFetch } from "../authorizedFetch"

const BuildQueryUserDelete = (user) => {
    return buildPayload({
        query: `mutation($id: UUID!) {
            result: userDelete(input: {id: $id}) {
              id
              msg
            }
          }`,
          variables: {...user}
    })
}

export const UserDeleteActionAsync = (user) => async (dispatch, getState) => {
    const payload = BuildQueryUserDelete(user)
    const json = await authorizedFetch(payload)
    
    const jsondata = json.data
    const result = jsondata.result
    const msg = result.msg
    if (msg === "ok") {
        dispatch(actions.DeleteItem(user))
    }
    
    return jsondata
}