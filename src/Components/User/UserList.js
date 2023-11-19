import { UserSimple } from "./UserSimple"

export const UserList = ({users}) => {
    return (
        <>
            {Object.entries(users).map(
                ([id, user]) => <UserSimple key={id} user={user} />
            )}
        </>
    )
}