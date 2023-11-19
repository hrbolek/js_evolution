import { UserSimple, LikeButton } from './Components'

export const App = () => {

    const user = {name: "John"}
    return (
        <>
            <UserSimple user={user} />
            <LikeButton count={1} />
        </>
        
    )
}