import Card from 'react-bootstrap/Card';
import { UserDeleteButton } from './UserDeleteButton';

export const UserCard = ({user}) => {
    return (
        <Card>
            <Card.Header>
                {user.name}
            </Card.Header>
            <Card.Body>
                {user.name}
            </Card.Body>
            <Card.Footer>
                <UserDeleteButton user={user} />
            </Card.Footer>
        </Card>
    )
}