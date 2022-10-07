exports.responseCreator = (data) => {
    if (data) {
        return {
            resultCode: 0,
            messages: [],
            data
        }
    } else {
        return {
            resultCode: 0,
            messages: [],
            data: {}
        }
    }
}
exports.errorCreator = (err) => {
    if (err) {
        return {
            resultCode: 1,
            messages: [err],
            data: {}
        }
    } else {
        return {
            resultCode: 1,
            messages: [],
            data: {}
        }
    }
}

