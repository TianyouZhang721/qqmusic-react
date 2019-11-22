var baseurl = ''
var push = baseurl+'/recommend' // 推荐页面接口，用于轮播图和电台
var top = baseurl+'/toplist' // 排行的接口
var list = baseurl+'/songlist' // 具体某个排行的所有歌曲
var play = baseurl+'/songurl'
var lyric = baseurl+'/lyric'
var search = baseurl+'/search'
var singer = baseurl+'/albumImg'
module.exports={
    push,top,list,play,lyric,search,singer
}