## Step 9

Communication with server

### Run server

The server is written in python. 
It is based on GraphQL endpoint.
To run it, you should create virtual environment and install libraries referenced in `requirements.txt` file.

After that execute
```bash
uvicorn py_server.main:app
```

Alternatively you can include extra parameters.
```bash
uvicorn py_server.main:app --port 8888 --reload
```

This brings up the serve (backend).

### fetch function

There is `fetch` (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) function included in standard html javascript library.
This functions "calls" server for a response.
The response is received on client in asynchronous mode.
So the returned value of `fetch` function is `Promise`.

`Promise` can be awaited, `Promise` is also "thenable".
This means that often is followed by `.then(response => response.json())` or similar statement. 
Such statements can be stacked.


### Extra fetch Layer

To simplify the fetch process extra functions are defined in `Actions/authorizedFetch.js` file.
This implementation allows to include extra (alwys valid) parameters.
It also decodes incomming responses as jsons.

```js
export const URL = "/gql"
export const buildPayload = ({query, variables}) => (
    {
        body: JSON.stringify({query, variables})
    }
)

export const authorizedFetch = (payload) => {
    const extendedPayload = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        ...payload
    }
    return fetch(URL, extendedPayload).then(response => response.json())
}
```

### Fetching users from server

When the application starts the first fetch for user list is initiated.
The query sent to server is
```gql
{
    result: userPage {
        __typename
        id
        name
        surname
        email
    }
}
```

Query is transformed into payload and sent to server.
When server respons, response is decoded and for each received user is dispatched `action.ItemUpdate`.

All those parts are implemented in action `UserFetchAllActionAsync`
```js
const BuildQueryUserFetchAll = () => {
    return buildPayload({
        query: `{
            result: userPage {
              __typename
              id
              name
              surname
              email
            }
          }`
    })
}

export const UserFetchAllActionAsync = () => async (dispatch, getState) => {
    const payload = BuildQueryUserFetchAll()
    const json = await authorizedFetch(payload)
    
    const jsondata = json.data
    const users = jsondata.result
    users.forEach(
        user => {
            const action = actions.UpdateItem(user)
            dispatch(action)
        }
    );
    return jsondata
}
```
Notice that `UserFetchAllActionAsync` is compatible with `dispatch` system, so it can be dispatched.
Also notice that body is `async` and `authorizedFetch` is awaited.

### Initialization of store from server

Initialization of store from server should be done only once, when application starts.
It must be done when store is initialized.
As appropriate point `AppStore` component could be right.

The is defined component `AppStoreInitializer` which is empty component.
Its role is to dispatch `UserFetchAllActionAsync` action.
Other things are done automaticaly.

```js
const AppStoreInitializer = () => {
    const dispatch = useDispatch()
    useEffect(
        () => {
            dispatch(UserFetchAllActionAsync())
        }
    )
    return null
}

export const AppStore = ({children}) => {
    const store = configureStore({ 
        reducer: reducer, 
        preloadedState: {}
    })

    return (
        <Provider store={store}>
            <AppStoreInitializer />
            {children}
        </Provider>
    )
}
```

At this point we have incomming data from server stored in store.
UI is refreshed when server responds.

### Extra configuration

In `package.json` file is key:
```json
    "proxy": "http://127.0.0.1:8000/",
```
which sets a proxy. 
This means that if javascript program (developer server) is not capable to react to url based requests, it pass url command to `proxy` key having value `http://127.0.0.1:8000/`.
This is point where `py_server` responds.

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

`fetch` is method which allows ask server for some data.
When response is reived, they should be stored in store.
The process `ask for data` -> `store data` should be done in asynchronous action which is dispatchable.

Asynchronous action is a special function with parameters `dispatch` and `getState`. 
When dispatching such action it is possible to perform extra statements (aka server call) before final dispatch.
