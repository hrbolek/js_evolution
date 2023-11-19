## Step 6

A bit styles with boostrap

### CSS

Cascade Style Sheet is technique for specifying attributes to html elements.
Html elements are customizable. 
It is possible to change style of each html element or, and this is prefereable, is possible to assign classes to them.
Classes are then defined with set of attributes which are transfered to html element having it.

As this is very general, there are libraries supporting developers in this hard task. 
One of them is Bootstrap.
Boostrap library also has a react connector which defines appropriate components.
Boostrap also defines a grid on which components can be placed, or aligned with.

### Container

Container is component from bootstrap which is used a top of application.
Its `fuild` attribute means extend width to whole screen.
You can remove it to see the diference.

```js
export const App = () => {

    const [db, dispatch] = useReducer(reducer, users)
    return (
        <Container fluid>
            <UserList users={db} dispatch={dispatch}/>
        </Container>
    )
}
```

### Card

Card is complex element which allows to display complex element. 
In our case `user` can be shown this way.

import Card from 'react-bootstrap/Card';

```js
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
```

Notice `Header`, `Body` and `Footer` parts.

### Rows and Columns

Cards should be organized inside `Row` and `Col` components.
They also can be stacked (`Col` can contain `Row` with `Col` ...).
It is pretty common that vector of entities is encapsulated by `Row` and each item in vector is encapsulated with `Col`. 
You can see simillar approach in internet shops.

```js
import { UserAddButton } from "./UserAddButton"
import { UserCard } from "./UserCard"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const UserList = ({users, dispatch}) => {
    return (
        <Row>
            {Object.entries(users).map(
                ([id, user]) => <Col key={id} ><UserCard user={user} /></Col>
            )}
            <UserAddButton dispatch={dispatch} />
        </Row>
    )
}
```

### Buttons

Bootstrap also works with colors and offers some kind of standardization.
Check next variants

```js
    <Button variant={"primary"} onClick={onClick}>New User</Button>
    <Button variant={"secondary"} onClick={onClick}>New User</Button>
    <Button variant={"success"} onClick={onClick}>New User</Button>
    <Button variant={"warning"} onClick={onClick}>New User</Button>
    <Button variant={"info"} onClick={onClick}>New User</Button>
    <Button variant={"light"} onClick={onClick}>New User</Button>
    <Button variant={"dark"} onClick={onClick}>New User</Button>
```

```js
import { Button } from "react-bootstrap"

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
        <Button variant={"success"} onClick={onClick}>New User</Button>
    )
}
```

Also try to add user (click on button) multiple times.
Cards are stacked somehow. 
If you want to control it, you can add extra attributes to `Col` component.
There are `xs`, `sm`, `md`, `lg`, `xl` and `xxl` attributes. 
Each of them are linked to device where result is displayed.

See https://react-bootstrap.netlify.app/docs/layout/grid#col


Try next

```js
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
```

### How to run
if not initilized:
```bash
npm init
```

then 

```bash
npm run start
```

### Conclusion

Boostrap simplifies html formating and still allows high flexibility.
