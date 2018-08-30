const errMsgCatcher = (err) => {
    let msg = []

    for (let i = 0; i < err.errors.length; i++) {
        msg.push(err.errors[i].message)
    }
    return msg
}

module.exports = errMsgCatcher