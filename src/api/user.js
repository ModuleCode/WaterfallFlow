import request from "./request";


const loginByUsername = (data) => {
    return request({
        url: '/login/username',
        method: "POST",
        data: data
    })

}

export default {
    loginByUsername
}