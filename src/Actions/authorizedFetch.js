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
    // console.log("authorizedFetch")
    // console.log(JSON.stringify(extendedPayload))
    return fetch(URL, extendedPayload).then(response => response.json())
}