let https = require('http');
let cheerio = require('cheerio');
let fs = require('fs');
let request = require('request');

/*爬去桌面壁纸使用*/
//闭包循环地址的

var imagIndex = 0;
function getImages(index){
	if (index == 9) {
		return false;
	}
	console.log(index)
	https.get('http://www.netbian.com/desk/2095'+ index +'-1920x1080.htm', res => {
		let str = '';
		res.on('data', data => {
			str += data;
		})
		res.on('end', () => {
			let $ = cheerio.load(str);//node jquery 获取的页面上img的src地址
			let iamgSrc = $('#main table a img')[0].attribs['src']
			console.log(iamgSrc)
			request(iamgSrc).pipe(fs.createWriteStream('./images/'+index+'.jpg'))
			index += 1;
			getImages(index)
		})
	})
}

getImages(imagIndex);


/*https.get('https://www.aitaotu.com/zt/mntp/', res => {
	let str = '';

	res.on('data', data => {
		str+=data
	})

	res.on('end', () => {
		let $ =  cheerio.load(str);

		let imgs = Array.from( $('#maincont dl dd img') );
		let srcs = [];

		imgs.forEach((val) => {
			srcs.push(val.attribs['data-original'])
		})
		let srcsTxt = '';
		 srcs.forEach((val,index)=>{
		 	srcsTxt += '\r\n' + val

			request.head(val, (err, res, body)=>{
				console.log(res.path)
				if(err){
					console.log(err)
					return
				}
				request(val).pipe(fs.createWriteStream('./images/' + index + '.jpg'));
			});
		 })
	})
})*/

