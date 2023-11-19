## Step 4

Let use more complex structures.

### Dictionaries

Javscript can store complex data in list and / or dictionaries.
Every item in such variable can be also list or dictionary.
Dictionary is (in fact) keyed list.
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
```
It is very simple to initialize it, as you can see above.
To add item, you can do 
```js
    users["1d7dd5f0-d2e6-4962-aae0-0f8f89668f4d"] = {
        "id": "1d7dd5f0-d2e6-4962-aae0-0f8f89668f4d",
        "name": "Jepeto"
    }
```

To read an item
```js
    const item = users["1d7dd5f0-d2e6-4962-aae0-0f8f89668f4d"]
```

### React component

To handle such complex data structures, we should build appropriate components.
We already have a `SimpleUser` component.
The component maping the dictionary of users into list of `SimpleUser` componets has been declared in `Components/User/UserList.js`

```js
import { UserSimple } from "./UserSimple"

export const UserList = ({users}) => {
    return (
        <>
            {Object.entries(users).map(
                ([id, user]) => <UserSimple key={id} user={user} />
            )}
        </>
    )
}
```

Notice how the `SimpleUser` component is imported and how we iterate trought all `entries` in `users`.

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