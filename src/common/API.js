var baseurl = ''
var push = baseurl+'/recommend' // 推荐页面接口，用于轮播图和电台
var top = baseurl+'/toplist' // 排行的接口
var list = baseurl+'/songlist' // 具体某个排行的所有歌曲 this.$http.get(list, {params: {id: }})
var play = baseurl+'/songurl' // 歌曲地址   this.$http.get(play, {params: {mid: }})   songMid
var lyric = baseurl+'/lyric'  // 歌曲歌词 this.$http.get(lyric, {params: {songid: }})    songId
var search = baseurl+'/search' // this.$http.get(search, {params: {keyword: input内的值}})
var singer = baseurl+'/albumImg'
module.exports={
    push,top,list,play,lyric,search,singer
}