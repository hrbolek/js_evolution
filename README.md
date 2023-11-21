## Step 10

Full CRUD operations with server 

### CRUD

CRUD stands for Create, Read, Update and Delete operations.
All operations should be persistent (stored) with the help od backend.
The backend is alredy introducen, now we should implementa appropriate operations on client in Javascript language.


### fetch function

Just reminder, that there is `fetch` (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) function included in standard html javascript library. 
We also have created extra layer which help us to centralize some shared parameters (url as example). Extra functions are defined in `Actions/authorizedFetch.js` file.

### Queries for CUD

Structure of all queries and appropriate packets are defined by server.
Queries bellow are in standard GraphQL.

#### Create operation Query

```js
const BuildQueryUserInsert = (user) => {
    return buildPayload({
        query: `mutation($name: String!) {
            result: userInsert(input: {name: $name}) {
              id
              msg
              user {
                __typename
                id
                name
                surname
                email
              }
            }
          }`,
          variables: {...user}
    })
}
```

#### Update operation Query

```js
const BuildQueryUserUpdate = (user) => {
    return buildPayload({
        query: `mutation($id: UUID!, $name: String, $surname: String, $email: String) {
            result: userUpdate(input: {id: $id, name: $name, surname: $surname, email: $email}) {
              id
              msg
              user {
                __typename
                id
                name
                surname
                email
              }
            }
          }`,
          variables: {...user}
    })
}
```

#### Delete operation Query

```js
const BuildQueryUserDelete = (user) => {
    return buildPayload({
        query: `mutation($id: UUID!) {
            result: userDelete(input: {id: $id}) {
              id
              msg
            }
          }`,
          variables: {...user}
    })
}

```

### Dispatchable Asynchronous Actions for CUD

All asynchronous actions receives a response from server in asynchronous mode (notice `await` keyword). 
Then they analyse result and if result is appropriate they dispatch action (performs local update).

Scenario when at first the server is updated and then local update is made is "pesimistic" scenario. Its advance is that local state is always ok.

Also notice that all actions returns the decodec recieved data (`jsondata`).
Because call of `dispatch` with action in form of functions returns a value of that function, it is possible at place where `dispatch` is called receive this result, evaluate it and, probably, display an error if something went wrong.

#### Asynchronous Action Create

```js
export const UserInsertActionAsync = (user) => async (dispatch, getState) => {
    const payload = BuildQueryUserInsert(user)
    const json = await authorizedFetch(payload)
    
    const jsondata = json.data
    const result = jsondata.result
    const msg = result.msg
    const newUser = result.user
    if (msg === "ok") {
        dispatch(actions.UpdateItem(newUser))
    }
    
    return jsondata
}
```

#### Asynchronous Action Update

```js
export const UserUpdateActionAsync = (user) => async (dispatch, getState) => {
    const payload = BuildQueryUserUpdate(user)
    const json = await authorizedFetch(payload)
    
    const jsondata = json.data
    const result = jsondata.result
    const msg = result.msg
    const newUser = result.user
    if (msg === "ok") {
        dispatch(actions.UpdateItem(newUser))
    }
    
    return jsondata
}
```

#### Asynchronous Action Delete

```js
export const UserDeleteActionAsync = (user) => async (dispatch, getState) => {
    const payload = BuildQueryUserDelete(user)
    const json = await authorizedFetch(payload)
    
    const jsondata = json.data
    const result = jsondata.result
    const msg = result.msg
    if (msg === "ok") {
        dispatch(actions.DeleteItem(user))
    }
    
    return jsondata
}
```

### React components with support of CUD operations

#### Create button
This is very simple component based on `button`.
If it is clicked, it dispatch asynchronous function `UserInsertActionAsync`.
Nothing else is needed.

```js
export const UserAddButton = () => {
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(UserInsertActionAsync({name: "Jekyll"}))
    }
    return (
        <Button onClick={onClick}>New User</Button>
    )
}
```

#### Delete button

Nearly same as create button.
There is little difference. 
Instead of use `button` a bit more complex component are used.
This allows to force user confirm that the deletion process is really wanted (click on two buttons).

```js
export const UserDeleteButton = ({user}) => {
    const dispatch = useDispatch()
    const onDelete = () => dispatch(UserDeleteActionAsync(user))

    return (
        <DeleteButton onDelete={onDelete}>
            <TrashFill />
        </DeleteButton>
    )
}
```

#### Change attributes

This is the most difficult process.
At first we need an input element which displays value (as na example name of user), allows to edit it, catch the changes, sent changes to server and when server responds "ok", change also local value (name of user).

Such edit (keyboard typings) can be quite fast and it is not wanted to send an extra packet to server with change one letter.
To cover such situation, there is delayer which suspends `onChange` callback.
When nothing happends for several miliseconds, `onChange` is called.

This `Delayer` is implemented in `Components/General/CreateDelayer.js` file.
`TextInput` is component responsible for displaying of editable value (user name). 
There is `Delayer` used. 
Because the `TextInput` component is rerendered quite often, it is important to memorize `Delayer`, this is the reason why `useState` is used for its memorization.
Also the text value must be memorized and again `useState` is used.

```js
export const TextInput = ({value, onChange, placeholder}) => {
    const [localValue, setLocalValue] = useState(value)  
    const [delayer] = useState(() => CreateDelayer())   
    const localOnChange = 
        (e) => {
            const newValue = e.target.value
            setLocalValue(newValue)
            if (onChange) {
                delayer(() => onChange(newValue))
            }
        }
    const onBlur = 
        (e) => {
            const newValue = e.target.value
            if (newValue !== localValue) {
                localOnChange(e)
                onChange(newValue)
            }
        }
    return (
        <input className="form-control" placeholder={placeholder} value={localValue} onChange={localOnChange} onBlur={onBlur}/>
    )
}
```

User entity has `name`, `surname` and `email` attributes.
All of them shoul be available for edit.
This user interface is encapsulated in `UserCard` component.

```js
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
```

`TextInput`s are introduced in `Card` and changes are monitored. 
These changes are delayed. When change is done, `onAttributeChange` is called and then `UserUpdateActionAsync` action is dispatched.

The dispatch process sends appropriate data to server and if server responds with "ok", local change is done.
If function `onUserChange` is possible to append error handling as `dispatch` return a decoded packet from server response.

### How to run
if not initilized:
```bash
npm init
```

do not forget to run (in prepared virtual environment)
```bash
uvicorn py_server.main:app
```

then 

```bash
npm run start
```

### Conclusion

We implemented CRUD operations on backend (server) and in pesimistic update also in local store.