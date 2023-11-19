## Step 8

Asynchronous actions

### Asynchronous actions

Asynchronous actions are actions which are functions.
So if there is come creator, it must return a function.
Such kind of action is handled differently.
There (thanks to `redux-toolkit`) has been connected special middleware in dispatch process. 
Actions represented by function are, during dispatching, called with extra parameters (`dispatch`, `getState`).
In file `Actions/User/UserDeleteActionAsync.js` is introduced first action.
The code is bellow.
Check the signature. `UserDeleteActionAsync` function returns a function.
The body of returned function calls dispatch. 
But there is possible to do anything. 
Later we will show how to use this to communicate with server and put the result of communication put in the store.

```js
import { actions } from "../../Store"
export const UserDeleteActionAsync = (user) => (dispatch, getState) => {
    
    dispatch(actions.DeleteItem(user))
}
```

### Use of Asynchronous Action

Asynchronous action can be dispatched as any other function.
There is `UserDeleteButton` component which uses this action.

`UserDeleteButton` component has local state which allows to ask user for confirmation of deletion.
The state can be 0 or 1. 
- At state 0 one button is displayed, when pressed, state changes to 1. 
- At state 1 two buttons are visible, click on first button set state back to 0, click on second button dispatch `UserDeleteActionAsync`.

```js
export const UserDeleteButton = ({user}) => {
    const dispatch = useDispatch()

    const [state, setState] = useState(0)
    const reallyDelete = () => {
        dispatch(UserDeleteActionAsync(user))
    }

    const probablyDelete = () => {
        if (state === 0) {
            setState(1)
        } else {
            setState(0)
        }
    }

    if (state === 0) {
        return (
                <Button variant="warning" onClick={probablyDelete}><TrashFill /></Button>
        )
    } else {
        return (
            <>
                <Button variant="warning" onClick={probablyDelete}><TrashFill /></Button>
                <Button variant="danger" onClick={reallyDelete}><TrashFill /></Button>
            </>
        )        
    }   
}
```

### Intermezzo

The confirmation of delete process is general and should be isolated in special component for future reuse.

Such component is implemented bellow (check `Components/General/DeleteButton.js` file). This component accepts `children` (encapsulated components) and `onDelete`. `onDelete` is called when user confirms delete by clicking on second (red) button.

```js
export const DeleteButton = ({children, onDelete}) => {

    const [state, setState] = useState(0)
    const reallyDelete = () => {
        setState(0)
        onDelete()
    }

    const probablyDelete = () => {
        if (state === 0) {
            setState(1)
        } else {
            setState(0)
        }
    }

    if (state === 0) {
        return (
                <Button variant="warning" onClick={probablyDelete}>{children}</Button>
        )
    } else {
        return (
            <>
                <Button variant="warning" onClick={probablyDelete}>{children}</Button>
                <Button variant="danger" onClick={reallyDelete}>{children}</Button>
            </>
        )        
    }   
}
```

`DeleteButton` component simplify definition of `UserDeleteButton`. 
Check code bellow.
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

Asynchronous action is a special function with parameters `dispatch` and `getState`. 
When dispatching such action it is possible to perform extra statements (aka server call) before final dispatch.
