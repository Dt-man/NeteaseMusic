// pages/list/index.js
import { search } from '../../utils/api/search/index'

import { getMusicUrl } from '../../utils/api/list/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isPlay: false,
    percent: 0,
    progressDuration: 300,
    music: null,
    musicId: null,
    musicFile: null,
    musicCurrentTime: 0
  },

  /**
   * 
   */
  handleTap(e) {
    const {musicId,isPlay,musicFile,music,percent,musicCurrentTime} = this.data
    if ((musicId && musicId === e.currentTarget.dataset.id) && isPlay) {
      this.setData({
        isPlay: false,
        percent: (musicCurrentTime / (musicFile.br / 1000)) * 100
      })
      console.log(musicCurrentTime,(musicCurrentTime / (musicFile.br / 1000)) * 100);
      return music.pause()
    }

    if(musicId && !isPlay) {
      this.setData({
        isPlay: true,
        percent: 100
      })
      return music.play()
    }

    wx.showLoading({
      title: '加载中...'
    })
    this.setData({
      percent: 0
    })
    getMusicUrl({ id: e.currentTarget.dataset.id || musicId }).then(res => {
      if (res.status !== 200) {
        return wx.showToast({
          icon: 'none',
          title: '请求失败,请稍后重试',
          duration: 2000
        })
      }
      music.src = res.url
      music.play()
      this.setData({
        isPlay: true,
        percent: 100,
        progressDuration: res.br / 100,
        musicId: e.currentTarget.dataset.id,
        musicFile: res
      })
      setInterval(()=>{
        this.data.musicCurrentTime ++
      },1000)
    }).finally(() => {
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { keywords } = options
    search({ keywords }).then(res => {
      res.result.songs.forEach(item => {
        item.newName = item.name.replace(new RegExp(keywords, 'gi'), `<span style="color:#ea5455">${keywords}</span>`)
        item.artists.map((v, i) => {
          if (!item.artistsName) {
            return item.artistsName = v.name
          }
          if (i <= item.artists.length) {
            item.artistsName += '、' + v.name
          }
        })
      })
      this.setData({
        list: res.result.songs,
        music: wx.createInnerAudioContext()
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})