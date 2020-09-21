import { request } from '../../request'

export function getMusicUrl(data) {
    return request({
        url: '/UnblockNeteaseMusic/',
        method: 'get',
        data
    })
}