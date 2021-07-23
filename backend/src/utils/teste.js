const url = 'http://lattes.cnpq.br/4908629814578201';
const axios = require('axios')
const cheerio = require('cheerio')


axios.get(url).then(response =>{
    const professores=response.data;
    const $ = cheerio.load(response.data);
    const codigo = $('form').text();
    console.log($('form').text());

}
    
    )