const builder = require('botbuilder')
const restify = require('restify')

//setup restify
const server = restify.createServer()
server.listen(3978, () => {
    console.log('restify listening on port 3978')
})

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
})
const bot = new builder.UniversalBot(connector)

server.post('/api/messages', connector.listen())



//series of dialogs
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
        session.beginDialog('/start')
    }
])

bot.dialog('/start', [
    (session,args,next) => {
        builder.Prompts.text(session,'What are you looking for? You can say things like: Where is Kilachand?')
    },
    (session,args,next) => {
        session.userData.email = args.response
        if(session.userData.email=='Where is Kilachand?' || session.userData.email=='Kilachand' || 
            session.userData.email=='Where\'s is Kilachand?' || session.userData.email=='Kilachand?' || session.userData.email=='kilichand?'
        || session.userData.email=='kilachand?' || session.userData.email=='where\'s kilachand?' || session.userData.email=='wheres is kilichand'){
            session.send('Kilachand is located on Baystate, across the street from the Marciano dining hall! \n https://goo.gl/maps/75Mz8aMJBH62') 
            session.beginDialog('/start2')
        }
        else if(session.userData.email=='Where is Fitrec?' || session.userData.email=='Fitrec' || 
        session.userData.email=='Where\'s is Fitrec?' || session.userData.email=='Fitrec?' || session.userData.email=='fitrec?'
    || session.userData.email=='fitrec?' || session.userData.email=='where\'s is fitrec?' || session.userData.email=='wheres is fitrect'||
    session.userData.email=='where is the gym?' ||   session.userData.email=='the gym?' )
        {
            session.send('Fitrec is located in West Campus, near Agganis Arena! \n https://goo.gl/maps/75Mz8aMJBH62') 
            session.beginDialog('/start2')
        }
        else if(session.userData.email=='Where is CAS?' || session.userData.email=='College of Arts and Sciences' || 
        session.userData.email=='Where\'s is CAS?' || session.userData.email=='CAS?' || session.userData.email=='cas?'
    || session.userData.email=='CAS?' || session.userData.email=='where\'s CAS?' || session.userData.email=='where is College of Arts and Sciences'||
    session.userData.email=='where is the college of arts and sciences?' ||   session.userData.email=='the college of arts and sciences?' )
        {
            session.send('The College of Arts and Sciences is located near Central Campus! \n https://goo.gl/maps/75Mz8aMJBH62') 
            session.beginDialog('/start2')
        }
        else if(session.userData.email=='Is the dining hall open?' || session.userData.email=='is the Dining Hall Open?' || 
        session.userData.email=='dining hall open?' || session.userData.email=='Dining hall hours?' || session.userData.email=='dining hall Hours?'
    || session.userData.email=='Dining Hall Hours?' || session.userData.email=='Dining hall Open?' || session.userData.email=='dining hall open')
        {
            var d = new Date()

            if (d.getHours()>=7 && d.getHours()<= 21){
                session.send('Yes the dining hall is open! The hours are 7AM - 9PM') 
            }
           else {
               session.send('The dining hall is not open. The hours are 7AM - 9PM')
           }
            session.beginDialog('/start2')
        }
        else {
            session.send('Sorry I didnt understand that!')
            session.beginDialog('/start')
        }
    }    

])
bot.dialog('/start2', [
    (session,args,next) => {
        builder.Prompts.text(session,'What else can I help you with?')
    },
    (session,args,next) => {
        session.userData.email = args.response
        if(session.userData.email=='Where is Kilachand?' || session.userData.email=='Kilachand' || 
            session.userData.email=='Where\'s is Kilachand?' || session.userData.email=='Kilachand?' ){
            session.send('Kilachand is located on Baystate, across the street from the Marciano dining hall! \n https://goo.gl/maps/75Mz8aMJBH62')
            session.beginDialog('/start')
        }
        
        else {
            session.send('Sorry I didnt understand that!')
            session.beginDialog('/start')
        }
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

