import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
    const error = useRouteError()
    console.error(error)
    return(
        <>
            <h1 style={{fontSize: "70px", marginBottom: "10px", padding: "0px"}}>{error.status}</h1>
            <p style={{fontSize: "30px", marginTop: "0px"}}>{error.error.message}</p>
        </>
    )
}

export default ErrorPage