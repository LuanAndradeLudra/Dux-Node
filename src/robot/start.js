function start(client) {
    client.onMessage((message) => {
        client
            .sendText(message.from, 'Welcome Venom 🕷')
            .then((result) => {
                //console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                //console.error('Error when sending: ', erro); //return object error
            });
    });
}

module.exports = start;