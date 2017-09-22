var request = require('request')
var iconv = require('iconv-lite')
var cheerio = require('cheerio')
var async = require('async')

function search (movieName) {
  var sourceName = movieName
  movieName = chinese2Gb2312(movieName)
  var url = 'http://s.dydytt.net/plus/search.php?kwtype=0&searchtype=title&keyword=' + movieName

  return new Promise(function (resolve, reject) {
    request({url: url, encoding: null}, function (error, response, body) {
      if (response.statusCode !== 200) {
        reject(error)
      } else {
        body = iconv.decode(body, 'gb2312').toString()
        handleCotent(sourceName, body, resolve)
      }
    })
  })
}

function handleCotent (movieName, data, render) {
  var detailsArr = getDetailsFromContent(movieName, data)
  getDownloadUrlsFromDetails(detailsArr, render)
}

function getDetailsFromContent (movieName, data) {
  var $ = cheerio.load(data, {decodeEntities: false})
  var $ul = $('.bd3r .co_content8').children('ul')
  var len = $ul.find('table').length
  var arr = []
  if (len) {
    $ul.find('table').each(function () {
      var $title = $(this).find('tr').eq('0').find('td').eq('1').find('a')
      if ($title.html() !== null) {
        var title = $title.html().split('《')[1]
        if (title.indexOf('<font color="red">' + movieName + '</font>') === 0) {
          var obj = {}
          obj.title = $title.html()
          obj.href = $title.attr('href')
          arr.push(obj)
        }
      }
    })
  }
  return arr
}

function getDownloadUrlsFromDetails (arr, render) {
  async.map(arr, function (item, callback) {
    var url = 'http://www.ygdy8.com' + item.href
    request({url: url, encoding: null}, function (error, response, body) {
      var newItem = {}
      newItem.text = item.title
      body = iconv.decode(body, 'gb2312').toString()
      newItem.href = getDownloadUrlByDetailContent(body)
      callback(error, newItem)
    })
  }, function (error, results) {
    console.log(error)
    render(results)
  })
}

function getDownloadUrlByDetailContent (content) {
  var $ = cheerio.load(content, {decodeEntities: false})
  return $('#Zoom > span > table > tbody > tr > td > a').attr('href') ? $('#Zoom > span > table > tbody > tr > td > a').attr('href') : $('#Zoom > span > table > tbody > tr > td > u > font > a').attr('href')
}

let pad = function (number, length, pos) {
  var str = '%' + number
  while (str.length < length) {
    // 向右边补0
    if (pos === 'r') {
      str = str + '0'
    } else {
      str = '0' + str
    }
  }
  return str
}

let toHex = function (chr, padLen) {
  if (padLen == null) {
    padLen = 2
  }
  return pad(chr.toString(16), padLen)
}

function chinese2Gb2312 (data) {
  var gb2312 = iconv.encode(data.toString('UCS2'), 'GB2312')
  var gb2312Hex = ''
  for (var i = 0; i < gb2312.length; ++i) {
    gb2312Hex += toHex(gb2312[i])
  }
  return gb2312Hex.toUpperCase()
}

export default {
  search
}
