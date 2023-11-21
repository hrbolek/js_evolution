import { Button } from "react-bootstrap"
import { UserInsertActionAsync } from '../../Actions'
import { useDispatch } from "react-redux"

export const UserAddButton = () => {
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(UserInsertActionAsync({name: "Jekyll"}))
    }
    return (
        <Button onClick={onClick}>New User</Button>
    )
}