import { request } from '../../request'

export function search(data) {
    return request({
        url: 'NeteaseCloudMusicApi/search',
        method:'get',
        data
    })
}
