import { Provider, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './Store'
import { useEffect } from 'react'
import { UserFetchAllActionAsync } from './Actions/User/UserFetchAllActionAsync'

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