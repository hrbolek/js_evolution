import { UserAddButton } from "./UserAddButton"
import { UserSimple } from "./UserSimple"

export const UserList = ({users, dispatch}) => {
    return (
        <>
            {Object.entries(users).map(
                ([id, user]) => <UserSimple key={id} user={user} />
            )}
            <UserAddButton dispatch={dispatch} />
        </>
    )
}