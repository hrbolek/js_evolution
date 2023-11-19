import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './Store'

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