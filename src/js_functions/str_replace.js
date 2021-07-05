class StrReplace {
    constructor() { };

    static dataReplace(str){
        let day = str.substring(0, 2);
        let month = str.substring(3, 5);
        let year = str.substring(6, 10);
        let date = month + "/" + day + "/" + year;
        return date;
    }

    static phoneReplace(str) {
        let phone = str.replace('(', '');
        phone = phone.replace(')', '');
        phone = phone.replace(' ', '');
        phone = phone.replace('-', '');
        phone = "55" + phone;
        return phone;
    }

    static reverseDateReplace(str) {
        let month = str.substring(0, 2);
        let day = str.substring(3, 5);
        let year = str.substring(6, 10);
        let date = day + "/" + month + "/" + year;
        return date;
    }
}

module.exports = StrReplace;