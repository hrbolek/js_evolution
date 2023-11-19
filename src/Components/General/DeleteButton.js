import Button from "react-bootstrap/Button"
import { useState } from "react"

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