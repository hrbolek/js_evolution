import { useDispatch } from "react-redux"
import { UserDeleteActionAsync } from "../../Actions"
import { TrashFill } from "react-bootstrap-icons"
import { DeleteButton } from "../General"

export const UserDeleteButton = ({user}) => {
    const dispatch = useDispatch()
    const onDelete = () => dispatch(UserDeleteActionAsync(user))

    return (
        <DeleteButton onDelete={onDelete}>
            <TrashFill />
        </DeleteButton>
    )
}