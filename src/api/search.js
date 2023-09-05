import request from "./request";

const getHotTags = (data) => {
    return request({
        url: '/tags/hots',
        method: "POST",
        data: data
    })

}
const search = (searchKey) => {
    return request({
        url: '/search/' + searchKey,
        method: 'POST',
    })
}

export default {
    getHotTags,
    search
}