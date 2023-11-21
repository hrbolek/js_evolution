//UserFetchByIdActionAsync
import { actions } from "../../Store"
import { buildPayload, authorizedFetch } from "../authorizedFetch"

const BuildQueryUserById = (user) => {
    return buildPayload({
        query: `query($id: UUID!){
            result: userById(id: $id) {
              __typename
              id
              name
              surname
              email
            }
          }`,
          variables: {...user}
    })
}

export const UserFetchByIdActionAsync = (user) => async (dispatch, getState) => {
    const payload = BuildQueryUserById()
    const json = await authorizedFetch(payload)
    
    const jsondata = json.data
    const result = jsondata.result
    if (result) {
        dispatch(actions.ReplaceItem(result))   
    }
    return jsondata
}