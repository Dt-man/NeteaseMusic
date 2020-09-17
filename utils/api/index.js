import { request } from '../request'

export function banner(data) {
    return request({
        url: 'NeteaseCloudMusicApi/banner',
        method:'get',
        data
    })
}