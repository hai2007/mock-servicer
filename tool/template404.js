module.exports = function (list) {
    let template = "<ul><li><a href='../'>..</a></li>";
    for (let index in list) {
        template += "<li><a href='" + list[index].url + "'>" + list[index].url + "</a></li>";
    }
    return template + "<ul>";
};