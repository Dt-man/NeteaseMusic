
export function request({url,method,data}) {
    return new Promise((resolve,rejects) => {
        wx.request({
            url: 'http://47.105.214.15/'+url,
            method,
            data,
            success({data}) {
                resolve(data)
            },
            fail(data) {
                rejects(data)
            }
        })
    })
}