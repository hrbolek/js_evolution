import { actions } from "../../Store"
import { buildPayload, authorizedFetch } from "../authorizedFetch"

const BuildQueryUserInsert = (user) => {
    return buildPayload({
        query: `mutation($name: String!) {
            result: userInsert(input: {name: $name}) {
              id
              msg
              user {
                __typename
                id
                name
                surname
                email
              }
            }
          }`,
          variables: {...user}
    })
}

export const UserInsertActionAsync = (user) => async (dispatch, getState) => {
    const payload = BuildQueryUserInsert(user)
    const json = await authorizedFetch(payload)
    
    const jsondata = json.data
    const result = jsondata.result
    const msg = result.msg
    const newUser = result.user
    if (msg === "ok") {
        dispatch(actions.UpdateItem(newUser))
    }
    
    return jsondata
}