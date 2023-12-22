const getDate = (timeStamp) => {
    try {
        // console.log({ timeStamp });
        const stamp = typeof timeStamp === 'string' ? JSON.parse(timeStamp) : timeStamp
        // return 27
        const fullDate = new Date(stamp.seconds * 1000)
        const date = fullDate.getDate()
        const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const month = monthArr[fullDate.getMonth()]
        const year = fullDate.getFullYear()
        // console.log({ date: { date, month, year } })
        return { date, month, year }
    } catch (error) {
        return 'undefined'
    }

}

const formatDate = (dateObject) => {
    return `${ dateObject.date } ${ dateObject.month }, ${ dateObject.year }`
}
export {
    getDate, formatDate
}