import Card from 'react-bootstrap/Card';

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
                {user.name}
            </Card.Footer>
        </Card>
    )
}