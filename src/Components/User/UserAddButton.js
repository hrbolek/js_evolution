import { Button } from "react-bootstrap"

const AddUser = (user) => {
    return {
        payload: user,
        type: "items/CreateItem"
    }
}

export const UserAddButton = ({dispatch}) => {
    const onClick = () => {
        dispatch(AddUser({name: "Jekyll"}))
    }
    return (
        <Button onClick={onClick}>New User</Button>
    )
}