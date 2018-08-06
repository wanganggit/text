const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前加载的分类
    category: {},
    // 此分类下的全部店铺
    shops: [],

    pageIndex: 0,
    pageSize: 20,
    hasMore: true
  },

  loadMore () {
    if(!this.data.hasMore) return
    let { pageIndex, pageSize } = this.data
    var urlShop = 'categories/' + this.data.category.id + '/shops'
    var params = { _page: ++pageIndex, _limit: pageSize }
    return util(urlShop,params).then(res => {
      let totalCount = parseInt(res.header['X-Total-Count'])
      let hasMore = pageIndex * pageSize < totalCount
      let shops = this.data.shops.concat(res.data)
      this.setData({shops: shops, pageIndex: pageIndex, hasMore: hasMore})
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = 'categories/' + options.cat
    util(url).then(res => {
      console.log(res.data)
      this.setData({category: res.data})
      wx.setNavigationBarTitle({
        title: res.data.name
      })

      // 触发商铺的信息
      // var urlShop = 'categories/' + this.data.category.id + '/shops'
      // return util(urlShop,{_page: 1, _limit:10})
      this.loadMore()
    })
    // .then(res => {
    //     this.setData({shops: res.data})
    //   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.category.name){
      wx.setNavigationBarTitle({
          title: res.data.name
        })
    }
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
    // 重新加载数据、
    this.setData({
      shops: [],
      pageIndex: 0,
      hasMore: true
    })
    this.loadMore().then(() => {wx.stopPullDownRefresh()})
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 在这里加载下一页的数据
    // 需要判断是否正在加载，否则会有多次触发问题
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})