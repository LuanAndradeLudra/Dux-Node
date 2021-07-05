const Users = require("../database/models/users");
const Spams = require("../database/models/spams");
const StrReplace = require("../js_functions/str_replace");
const UserController = require("../controllers/userController");
const fullDate = require("../js_functions/getFullDate");

async function spamDue(client) {
    Spams.findOne({
        where: {
            date: fullDate(),
        }
    }).then((date) => {
        if (!date) {
            Users.findAll().then((users) => {
                let dueUsers = UserController.getDues(users);
                let dueUsersSize = objSize(dueUsers);
        
                console.log(`Enviando mensagens de vencimento para ${dueUsersSize} clientes!`);
        
                Object.keys(dueUsers).forEach(async (value) => {
                    let user = dueUsers[value];
                    let phone = user.user.phone + "@c.us";
                    let dayOrDays = user.diffDays == 1 ? "dia" : "dias";
                    console.log(`Disparando mensagem para: ${user.user.name} | Dia de vencimento: ${StrReplace.reverseDateReplace(user.user.due_date)}`);
                    await client.sendImageAsSticker(phone, './src/images/logo.webp').catch((erro) => console.log(`Erro ao enviar a mensagem para ${user.user.name}\nTipo: ${erro.text}`));
                    await client.sendText(phone, `Olá ${user.user.name}, Me chamo Dux 🤖, Sou o assistente virtual da Supernova Rastreadores.`).catch((erro) => console.log(`Erro ao enviar a mensagem para ${user.user.name}\nTipo: ${erro.text}`));
                    await client.sendText(phone, `Estou passando aqui para te lembrar que faltam apenas ${user.diffDays} ${dayOrDays} para o vencimento da sua fatura! \n\nO não pagamento da sua fatura acarreta no bloqueio do acesso ao monitoramento e com 30 dias o serviço é cancelado!`).catch((erro) => console.log(`Erro ao enviar a mensagem para ${user.user.name}\nTipo: ${erro.text}`));
                    await client.sendText(phone, "Sua fatura foi enviada para o email cadastrado. \n\nOutras formas de pagamento:\n\nChave pix:\nsupernovarastreadores@gmail.com\nFavorecido: Misael Jr\n\nConta: Itaú\nAg. 0715\nCc. 45578-8\nFav. Misael Pereira Gomes Junior\n\nPic Pay\n@mpgjunior").catch((erro) => console.log(`Erro ao enviar a mensagem para ${user.user.name}\nTipo: ${erro.text}`));
                });
                Spams.create({
                    date: fullDate(),
                }).then(() => console.log("Data de spam criada")).catch((error) => console.log("Erro " + error));
            });
        }
    });
}

function objSize(obj) {

    var size = 0, key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }

    return size;
};

module.exports = spamDue;