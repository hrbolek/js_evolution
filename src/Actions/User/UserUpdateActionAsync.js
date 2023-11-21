import { actions } from "../../Store"
import { buildPayload, authorizedFetch } from "../authorizedFetch"

const BuildQueryUserUpdate = (user) => {
    return buildPayload({
        query: `mutation($id: UUID!, $name: String, $surname: String, $email: String) {
            result: userUpdate(input: {id: $id, name: $name, surname: $surname, email: $email}) {
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

export const UserUpdateActionAsync = (user) => async (dispatch, getState) => {
    const payload = BuildQueryUserUpdate(user)
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