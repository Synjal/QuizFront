import {useContext, useEffect, useState} from 'react'
import {ThemeContext} from '../context'

export function useFetch(url) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!url) return
        setLoading(true)

        async function fetchData() {
            try {
                const response = await fetch(url, {
                    headers: {'Content-Type': 'application/json'},
                })
                const data = await response.json()
                console.log(response, data)
                setData(data)
            } catch (err) {
                console.log(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [url])
    return {isLoading, data, error}
}

export function useTheme() {
    const {theme, toggleTheme} = useContext(ThemeContext)
    return {theme, toggleTheme}
}