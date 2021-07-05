const Users = require("../database/models/users");

class UserController {

    static getIna(users) {
        let ina = [];

        var date1 = new Date(), date2, diffDays;

        users.forEach((user) => {
            date2 = new Date(user.due_date);
            var t2 = date2.getTime();
            var t1 = date1.getTime();

            diffDays = parseInt((t2 - t1) / (24 * 3600 * 1000));
            if (diffDays < 0) {
                ina[user.id] = {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    due_date: user.due_date,
                    diffDays: diffDays,
                };
            }
        });
        var filtered = ina.filter(function (el) {
            return el != null;
        });
        return filtered;
    }

    static getDues(users) {
        let dueUsers = [];

        var date1 = new Date(), date2, diffDays;

        users.forEach((user) => {
            date2 = new Date(user.due_date);
            var t2 = date2.getTime();
            var t1 = date1.getTime();

            diffDays = parseInt((t2 - t1) / (24 * 3600 * 1000));

            if (diffDays >= 0 && diffDays <= 5) {

                dueUsers[user.id] = {
                    user: {
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                        due_date: user.due_date,
                    },
                    type: "coming",
                    diffDays: diffDays,
                };

            }

        });
        var filtered = dueUsers.filter(function (el) {
            return el != null;
        });

        return filtered;
    }

    static getTimeTillDue() {
        var date1 = new Date(), date2, diffDays;
        date2 = new Date(user.due_date);
        var t2 = date2.getTime();
        var t1 = date1.getTime();

        diffDays = parseInt((t2 - t1) / (24 * 3600 * 1000));

        return diffDays;
    }

}

module.exports = UserController;