module.exports = function parseStringAsArray(arrayAsString) {
    return  arrayAsString.split(',').map(tech => tech.trim());
    //map percorre um array e faz algo, nesse caso o trim(), que remove espaçoes antes e depois da string
}