let Mock  = require('mockjs');
let Random = Mock.Random;
module.exports = function() {
  var data = { 
      news: [],
      leaders: [],
      letters: []
  };
  var images = [1,2,3].map(x=>Random.image('100x100', Random.color(), Random.word(1,10)));
  for (var i = 0; i < 100; i++) {
    var content = Random.cparagraph(0,10);
    data.news.push({
        infoID: i, 
        infoType: Random.integer(0,4),
        infoTitle: Random.cword(8,20),
        infoContent: content,
        infoAuthor: Random.cname(),
        infoDate: Random.date(),
        images: images.slice(0,Random.integer(1,3))
    })
    if(i<=10){
      data.leaders.push({ // 根据数据模板生成模拟数据
        id: i, // 随机生成一个id
        name: Random.cname(), // 随机生成一个常见的中文姓名。
        addr: Random.city(), // @county(true)为数据模板
        'age|18-60': 1, // 'age|18-60': 1 为数据模板
        birth: Random.date(), // 随机生成日期
        sex: Random.integer(0, 1), // 随机生成整数, min:0, max1,
        images: images.slice(0,Random.integer(1,3))
      })
    }
    if(i<=20){
      data.letters.push({
        id: i, // 随机生成一个id
        //ownerEmail: Random.integer(0,100),
        ownerEmail: Random.cname(),
        letterTitle: Random.cword(6,18),
        letterTime: Random.date(),
        letterContent: content,
        backMessage: Random.cparagraph(0,10),
        returnTime:Random.date(),
        Ispermit: Random.integer(0,1), //0表示没有回复
        identify: Random.pick(['admin','police','resident'])
      })
    }
  }
  return data
}