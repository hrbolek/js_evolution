import { UserAddButton } from "./UserAddButton"
import { UserCard } from "./UserCard"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const UserList = ({users, dispatch}) => {
    return (
        <Row>
            {Object.entries(users).map(
                ([id, user]) => <Col md={3} key={id} ><UserCard user={user} /></Col>
            )}
            <UserAddButton dispatch={dispatch} />
        </Row>
    )
}