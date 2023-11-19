import 'bootstrap/dist/css/bootstrap.css';

import { UserList } from './Components'
import { Container } from 'react-bootstrap'

import { AppStore } from './AppStore';

export const App = () => {
    return (
        <AppStore>
            <Container fluid>
                <UserList/>
            </Container>
        </AppStore>
    )
}