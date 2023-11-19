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