const dateReader = (date) => {
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
}

module.exports = dateReader