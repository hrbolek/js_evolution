import { UserAddButton } from "./UserAddButton"
import { UserCard } from "./UserCard"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import { useSelector, useDispatch } from "react-redux"
export const UserList = () => {
    const users = useSelector(state => state)
    const dispatch = useDispatch()
    return (
        <Row>
            {Object.entries(users).map(
                ([id, user]) => <Col md={3} key={id} ><UserCard user={user} /></Col>
            )}
            <UserAddButton dispatch={dispatch} />
        </Row>
    )
}