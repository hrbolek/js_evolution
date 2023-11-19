## Step 3

This is "Hello World" application.
It is based on `react` library which is nice library for building user interface based on component.

### Callbacks and local state

A parameter of component can be also function.

```js
import { useState  } from "react"

export const LikeButton = ({count=1, onChange=null}) => {

    const [counter, setCounter] = useState(count)
    const localOnClick = () => {
        setCounter(counter + 1)
        if (onChange) {
            onChange(counter + 1)
        }
    }

    return <button onClick={localOnClick}>Like! ({counter})</button>
}
```

In this component, onChange is a function.
Check its usage in `localOnClick` function, which are linked to button onClick event.
Anytime a button is clicked, `localOnClick` function is called, and, if defined, consequntly also `onChange`.

To keep local state of variable, `useState` hook (React calls this a hook) is used. 
This hook (function) returns a list of current value (state) and function which can change the state.

It is important to think who is responsible for state storage. 
There are two scenarios, both of them have an usage.
- First, and this is implemented, the component has responsibility for state
- Second, the parent (direct or indirect) of component receives a changes and stores them and rerenders child.

If `useState` hook is use in a component, such component has its own state.
It is component with state. Its behaviour depends on input and also on state.
Stateless components purely depends only on inputs.
If input are same, the behaviour is same.


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

We introduce a component with internal (local) state.