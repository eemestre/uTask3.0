import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(null)
    
    // POST
    const httpConfig = (data, method) => {
        if(method === "POST" || method === "PATCH"){
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            setMethod(method)
        }
    }

    useEffect(() => {
        const httpRequest = async() => {
            let json
            if(method === "POST" || method === "PATCH") {
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                json = await res.json()
            }
            setCallFetch(json)
        }
        httpRequest()
    }, [config, method, url])

    // GET
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url)
            const json = await res.json()
            setData(json)
        }
        fetchData()
    }, [url, callFetch])

    return {
        data,
        httpConfig
    }
}