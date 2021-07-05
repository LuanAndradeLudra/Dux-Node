function getFullDate() {
    var date1 = new Date();
    var day = date1.getDate();
    var month = date1.getMonth();
    var year = date1.getFullYear();
    var final = `${day}/${month}/${year} `;
    return final;
}

module.exports = getFullDate;