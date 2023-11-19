## Step 5

Managing central state of application (Store).

As there have been added some packages, run
```bash
npm install --force
```
at first


### State

As mentioned earlier, it is not good idea to spread pieces of state across components. 
Such approach is hard to maitain. 
Suggested concept is to create single place where all parts of application state are stored.
This single place is a store.

### State functions

It is possible to write functions like
```js
export const CreateItem = (state, action) => {
    const item = action.payload;
    const id = item['id'] || uuid1()
    if (!item['id']) {
        item['id'] = id
    }
    
    state[id] = item
    return state
}
```

Such function has two parameters `state` and `action`.
While `state` defines current state, `action` holds all data needed for a change.
There is a standard to use `type` attribute on `action` which determine a kind of action. 
This is especially useful for complex state functions. 
The parameter of change is assigned to `payload` attribute of `action`.

The `CreateItem` function has two parts. First one ensures that new item has an `id` which acts here as primary key (like in database). If `id` is missing, uuid standard is used for calculating new value.
Second part is just assignement to state (dictionary - like).

You should notice that this function is not pure, it changes an input variable.
Such approach can have unpredictable consequences so be carefull.

In `Store/reducers.js` are defined other state functions. 
All of them together define a set of basic operations (CUD) - `create`, `update` and `delete`.
There is also one extra - `replace` which is usefull when attributes should be deleted.

### State functions composition

In file `Store/store.js` you can find a function which is composition of CUD functions.
```js
const reducerIndex = {
    "CREATE": CreateItem,
    "UPDATE": UpdateItem,
    "REPLACE": ReplaceItem,
    "DELETE": DeleteItem
}

export const reducer = (state, action) => {
    const type = action.type
    const currentReducer = reducerIndex[type]
    const result = currentReducer(state, action)
    return {...result}
}
```
Notice usage of `reducerIndex` which allows to simplify implementation of composition. 
`action.type` determines which state function will be used.
Functions returns a copy of updated state (spread operator).
This is important react library has inner mechanism how to determine if something has changed.
If there is not change in input parameters of component, then cached output is used and component is not calculated.
Because `App` component is responsible for state maitenance, it must receive all changes.

```js
export const App = () => {

    const [db, dispatch] = useReducer(reducer, users)
    return (
        <>
            <UserList users={db} dispatch={dispatch}/>
        </>        
    )
}
```
All changes must be propagated to `App` component trought dispatching (calling `dispatch` function).

### State change

Now all things are settled and it is possible to add a button to `UserList`.
There is defined a special button `UserAddButton`

```js
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
        <button onClick={onClick}>New User</button>
    )
}
```

Function `AddUser` creates an action with proper type and payload.
When button receives a click, `UserAddButton.onClick` calls `dispatch` with parameter defining a wanted operation on state.
This is propagated to `App` component, where the change is performed, change in state is detected and underlying components are rerendered.

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

If there is a bit more complex state, `useReducer` hook could be used.
For such approach state functions must be defined.