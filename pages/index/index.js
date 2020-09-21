//index.js
import { banner } from '../../utils/api/index'
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerList:[]
  },
  onLoad() {
    // 获取轮播图
    this.getBannerList()
  },
  // 获取轮播图
  getBannerList() {
    banner({params:{type:1}}).then(res => {
      this.setData({
        bannerList:res.banners
      })
    })
  },
  // 跳转搜索页面
  toSearch() {
     wx.navigateTo({url: '/pages/search/index',});
  }
})
