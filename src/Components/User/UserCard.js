import Card from 'react-bootstrap/Card';
import { UserDeleteButton } from './UserDeleteButton';
import { TextInput } from '../General';
import { PersonFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { UserUpdateActionAsync } from '../../Actions/User/UserUpdateActionAsync';

export const UserCard = ({user}) => {
    const dispatch = useDispatch()
    const onUserChange = (newUser) => {
        dispatch(UserUpdateActionAsync(newUser))
    }
    const onAttributeChange = (value, name) => {
        const newUser = {...user}
        newUser[name] = value
        onUserChange(newUser)
    }
    const onChangeName = (value) => onAttributeChange(value, "name")
    const onChangeSurname = (value) => onAttributeChange(value, "surname")
    const onChangeEmail = (value) => onAttributeChange(value, "email")
    return (
        <Card>
            <Card.Header>
                <PersonFill/> User
            </Card.Header>
            <Card.Body>
                <TextInput value={user.name} onChange={onChangeName} />
                <TextInput value={user.surname} onChange={onChangeSurname} />
                <TextInput value={user.email} onChange={onChangeEmail} />
            </Card.Body>
            <Card.Footer>
                <UserDeleteButton user={user} />
            </Card.Footer>
        </Card>
    )
}