const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');

request.post('http://e-negocioscidadesp.prefeitura.sp.gov.br/Default.aspx', {
	form: {
		__EVENTTARGET: 'ctl00$cphConteudo$uccPainelLicitacao$lbtTotalLicitacoes',
		__EVENTARGUMENT: '',
		__VIEWSTATE: fs.readFileSync('enegocios.viewstate.txt', 'ascii')
	}
}, (error, response, body) => {
	if(error){
		console.error('REQUEST ERROR: ' + error.message);
		process.exit(error.code);
	}
		
	var $ = cheerio.load(body);
	console.log($.html());
	console.log($('.grid-resultado').find('tr').length);
	process.exit(0);
});

/*http.get({
	host: 'e-negocioscidadesp.prefeitura.sp.gov.br',
	port: 80,
	path: '/ResultadoBusca.aspx'
}, (res) => {
	var body = '';
	res.on('data', (chunk) => body += chunk);
	res.on('end', () => {
		var $ = cheerio.load(body.toString());
		console.log($.html());
		console.log($('table.grid-resultado').find('tr').length);
	});
}).on('error', (e) => console.log('ERRO: ' + e.message));*/