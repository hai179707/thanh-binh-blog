import { useEffect, useState } from "react"

const useDateFormat = time => {
    const [date, setDate] = useState(time)

    useEffect(() => {
        const newDate = new Date(time)
        const resultDate = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
        setDate(resultDate)
    }, [time])

    return date
}

export default useDateFormat