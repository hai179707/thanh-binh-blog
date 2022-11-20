import { useEffect, useState } from "react"


const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay)

        return () => clearTimeout(handler)
        // eslint-disable-next-line
    }, [value])

    return debounceValue
}

export default useDebounce