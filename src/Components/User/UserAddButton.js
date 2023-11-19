const AddUser = (user) => {
    return {
        payload: user,
        type: "CREATE"
    }
}

export const UserAddButton = ({dispatch}) => {
    const onClick = () => {
        dispatch(AddUser({name: "Jekyll"}))
    }
    return (
        <button onClick={onClick}>New User</button>
    )
}