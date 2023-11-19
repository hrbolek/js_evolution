## Step 7

Fully equiped store

### Reminder

State function is function with two parameters, `state` and `action`.
It is expected that state functions are composed to define full state machine.
To support state functions composition `action` must include `type` attribute and content should be in `payload`.

For usage with react the state function must not return mutated state. The return value must be new data structure.
Such condition especially for complex structures is quite complicated.

And there `redux-toolkit` (https://redux-toolkit.js.org/) enters into play.

### `redux-toolkit`

This library with the help of `immer` (https://immerjs.github.io/immer/) offers a set of functions.

#### `createSlice`

`createSlice` is a function which simplify state function composition. Also it prepares structure for creation of large state automate.

Bellow `reducer` is exported. This reducer works by same way as previous.
The action types are a bit different. The type of action `CreateItem` is now `"items/CreateItem"`.

```js
import { createSlice } from "@reduxjs/toolkit"
import { CreateItem, UpdateItem, ReplaceItem, DeleteItem } from "./reducers"


export const ItemSlice = createSlice({
    "name": "items",
    "initialState": {},
    reducers: {
        CreateItem,
        UpdateItem,
        ReplaceItem,
        DeleteItem
    }
})

export const { actions, reducer} = ItemSlice
```

#### `configureStore`

`configureStore` is a function from `redux-toolkit` which prepares a object covering functionalities needed for maitenance of complex centralized variable / store (database like).

```js
    const store = configureStore({ 
        reducer: reducer, 
        preloadedState: users
    })
```

The changes in this store can be done only by `dispatch` function.
Data from store and `dispatch` function must be available anywhere in the application.
If you do not want to pass those two entities to every component you must use different approach.

#### `dispatch` anywhere

There is possible to set and get context. 
Such approach has been used while creating `Provider` component.
Check `AppStore.js` file.

```js
const users = {
    "9c501da6-5f66-4932-ad9d-fc00541366d7": {
        "id": "9c501da6-5f66-4932-ad9d-fc00541366d7",
        "name": "John"
    },
    "0897e2ad-4bab-4234-a0cc-ed780883a2bf": {
        "id": "0897e2ad-4bab-4234-a0cc-ed780883a2bf",
        "name": "Julia"
    }
}

export const AppStore = ({children}) => {
    const store = configureStore({ 
        reducer: reducer, 
        preloadedState: users
    })

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
```

`AppStore` has one parameter `children`.
This is standard parameter which has all children elements in component tree.
To pass them to visualization process simply put them where needed - check the statement `{children}`.


`Provider` component has attribute `store`. Including this component in the application tree allows to get the context value (store) anywhere in application.
There are special hooks which read the `dispatch` function and content of the store `useSelector`.

The component `UserList` has been changed accordingly. The parameters `users` and `dispatch` have been removed. `useSelector` hook accepts as parameter a functions which returns a part of state (in store). Implementation bellow returns a whole state.

```js
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

We have introduced a store which is available anywhere in application without explicit passing it by parameters.
Now every single component can get `dispatch` (`useDispatch()`) and `state` (`useSelector(state => state)`).
