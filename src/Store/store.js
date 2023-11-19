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

// console.log(JSON.stringify(actions.CreateItem()))