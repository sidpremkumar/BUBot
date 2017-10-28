const builder = require('botbuilder')
const restify = require('restify')

//setup bot
const connector = new builder.ChatConnector()
const bot = new builder.UniversalBot(connector)

//setup restify
const server = restify.createServer()
server.listen(3978, () => {
    console.log('restify listening on port 3978')
})
server.post('/api/messages', connector.listen())


//create dialogs
bot.dialog('/', [
    (session, args, next) => {
        if (session.userData.name) {
            next()
        } else {
            session.beginDialog('/askname')
        }       
    },
    (session, args, next) => {
        session.send('Hello, ' + session.userData.name + "!")
    }
])

bot.dialog('/askname', [
    (session, args, next) => {
        builder.Prompts.text(session, "Hello user, what's your name?")
    },
    (session, args, next) => {
        session.userData.name = args.response
        session.endDialog()
    }
])

