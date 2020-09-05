    //Const
    const Discord = require("discord.js");
    const bot = new Discord.Client();
    


        //Console Log
    bot.on("ready", () => {
        console.log("Moderator Bot has Started!");


        //Bot Status
        bot.user.setActivity("!help", {type: "STREAMING"})
    })
    

    

    

        //admin Help
        bot.on("message", async message => {
        if(message.content === "!help Admin"){
            let embed = new Discord.MessageEmbed()
            .setTitle("**Admin Commands**")
            .addField("!Ban:", "!Ban    [user ping]", true)
            .addField("!Kick:", "!Kick    [user ping]", true)
            .addField("!say:", "!say    [text that the Bot should say in embed]", true)
            .setColor("RANDOM")
            .setFooter("Coded by Ares")
            .setThumbnail("")
    
            message.channel.send(embed);
        }

    






        if(message.content === "!help"){
            let embed = new Discord.MessageEmbed()
            .setTitle("**Commands**")
            .addField("!ping:", "!ping    shows your ping to the bot", true)
            .addField("!repeat:", "!repeat    [text that the Bot should say]", true)
            .addField("!user:", "!user     [user ping] shows you the users info", true)
            .addField("!serverinfo:", "!serverinfo     shows serverinfo", true)
            .addField("!report:", "!report    [user ping] [reason]", true)
            .setColor("RANDOM")
            .setFooter("Coded by Ares")
            .setThumbnail("")
    
            message.channel.send(embed);

        }

    if(message.content.startsWith("!clear")){  
        let messages = message.content.split(" ").slice(1).join("");
        message.delete();

        if(isNaN(messages)) return message.reply("You have not given us a number, you gave us letters!").then(msg=>msg.delete({timeout:"50000"}));

        console.log(messages)
        
        message.channel.bulkDelete(messages);

        message.channel.send("I have deleted " + messages + " messages!").then(msg=>msg.delete({timeout:"50000"}));
        
    }




    if(message.content.startsWith("!Kick")){
        message.delete()
        if(!message.author.hasPermission("KICK_MEMBERS")) return message.reply("You don't have the Permission for that command").then(msg=>msg.delete({timeout:"5000"}));


        let user = message.mentions.members.first();

        if(!user) return message.reply("you forgot to mention a member").then(msg=>msg.delete({timeout:"50000"}));

        message.guild.member(user).kick().catch(err=>{
            if(err){
                message.channel.send("I could not Kick the User! "+err).then(msg=>msg.delete({timeout:"50000"}));
            }else{
                message.channel.send("I kicked the User!").then(msg=>msg.delete({timeout:"50000"}));
            }
        })
    }





    if(message.content.startsWith("!Ban")){
        message.delete()
        if(!message.author.hasPermission("BAN_MEMBERS")) return message.reply("You don't have the Permission for that command").then(msg=>msg.delete({timeout:"5000"}));


        let user = message.mentions.members.first();

        if(!user) return message.reply("you forgot to mention a member").then(msg=>msg.delete({timeout:"50000"}));

        message.guild.member(user).ban().catch(err=>{
            if(err){
                message.channel.send("I could not ban the User! "+err).then(msg=>msg.delete({timeout:"50000"}));
            }else{
                message.channel.send("I banned the User!").then(msg=>msg.delete({timeout:"50000"}));
            }
        })
    }    







//Serverinfo command

    if(message.content === "!serverinfo"){
        if(!message.guild) return;

        let server = {
            logo: message.guild.iconURL(),
            name: message.guild.name,
            createdAt: message.guild.createdAt,
            id: message.guild.id,
            owner: message.guild.owner.user.username,
            region: message.guild.region,
            verified: message.guild.verified,
            members: message.guild.memberCount
        }








        let embed = new Discord.MessageEmbed()
        .setTitle("**Serverinfo**")
        .setColor("PURPLE")
        .setThumbnail(server.logo)
        .addField("**Name**: ",server.name, true)
        .addField("**id**: ",server.id, true)
        .addField("**Owner**: ",server.owner, true)
        .addField("**Region**: ",server.region, true)
        .addField("**Verified**: ",server.verified, true)
        .addField("**Members**: ",server.members, true)
        .addField("**Created At**: ",server.createdAt, true)

        message.channel.send(embed);

    }






//Userinfo Command

if(message.content.startsWith("!user")){
    let user = message.mentions.users.first() || message.author

    let userinfo = {
        avatar: user.avatarURL(),
        name: user.username,
        discrim: `#${user.discriminator}`,
        id: user.id,
        status: user.presence.status,
        bot: user.bot,
        erstelltAm: user.createdAt,

    }









    let embed = new Discord.MessageEmbed()
    .setThumbnail(userinfo.avatar)
    .setColor("PURPLE")
    .addField("**username**: ",userinfo.name, true)
    .addField("**Discriminator**: ",userinfo.discrim, true)
    .addField("**Id**: ", userinfo.id, true)
    .addField("**Status**: ", userinfo.status, true)
    .addField("**Bot**: ", userinfo.bot, true)
    .addField("**Created At**: ",userinfo.erstelltAm, true)

    message.channel.send(embed);

}







//report Command

if(message.content.startsWith("!report")){
    message.delete()
    var reportUser = message.mentions.users.first();
    var reason = message.content.split(" ").slice(1).join(" ");
    var channel = message.member.guild.channels.cache.find(ch=>ch.name==="name hier");

    if(reportUser == message.author) return message.channel.send("You can't report urself").then(mg=>msg.delete(3000))

    let embed = new Discord.MessageEmbed()
    .setTitle("Report")
    .setColor("RED")
    .setDescription(`${message.author} has reported ${reportUser} ! \nThe Reason is: ${reason}`)

    message.channel.send(embed)
}






//Ping command
if(message.content === "!ping"){
    message.channel.send("Pong! :ping_pong: your Ping is "+bot.ws.ping+"ms");
}





//Embed Command
if(message.content.startsWith("!say")){
    let content = message.content.split(" ").slice(1).join(" ");
        let embed = new Discord.MessageEmbed()
        .setTitle("Katzen Regeln")
        .setColor("BLUE")
        .setDescription(content)
        .setFooter("Coded by Ares")
        .setTimestamp();
        
        message.channel.send(embed);
}





if(message.content.startsWith("!repeat")){
    let text = message.content.split(" ").slice(1).join(" ");
    message.delete()

    message.channel.send(text).then(msg=>{
        msg(" ");
    })

}

    //Ticket System

    if(message.content.startsWith("!createticket")){
        let rawusername = message.author.username.split("").slice(0);

        let username = "";

        for(i=0;i<rawusername.length;i++){
            if(rawusername[i].toLowerCase() == "a"
            || rawusername[i].toLowerCase() == "b"
            || rawusername[i].toLowerCase() == "c"
            || rawusername[i].toLowerCase() == "d"
            || rawusername[i].toLowerCase() == "e"
            || rawusername[i].toLowerCase() == "f"
            || rawusername[i].toLowerCase() == "g"
            || rawusername[i].toLowerCase() == "h"
            || rawusername[i].toLowerCase() == "i"
            || rawusername[i].toLowerCase() == "j"
            || rawusername[i].toLowerCase() == "k"
            || rawusername[i].toLowerCase() == "l"
            || rawusername[i].toLowerCase() == "m"
            || rawusername[i].toLowerCase() == "n"
            || rawusername[i].toLowerCase() == "o"
            || rawusername[i].toLowerCase() == "p"
            || rawusername[i].toLowerCase() == "q"
            || rawusername[i].toLowerCase() == "r"
            || rawusername[i].toLowerCase() == "s"
            || rawusername[i].toLowerCase() == "t"
            || rawusername[i].toLowerCase() == "u"
            || rawusername[i].toLowerCase() == "v"
            || rawusername[i].toLowerCase() == "w"
            || rawusername[i].toLowerCase() == "x"
            || rawusername[i].toLowerCase() == "y"
            || rawusername[i].toLowerCase() == "z"
            || rawusername[i].toLowerCase() == "0"
            || rawusername[i].toLowerCase() == "1"
            || rawusername[i].toLowerCase() == "2"
            || rawusername[i].toLowerCase() == "3"
            || rawusername[i].toLowerCase() == "4"
            || rawusername[i].toLowerCase() == "5"
            || rawusername[i].toLowerCase() == "6"
            || rawusername[i].toLowerCase() == "7"
            || rawusername[i].toLowerCase() == "8"
            || rawusername[i].toLowerCase() == "9"){
                username+=rawusername[i].toLowerCase();
            }
        }

        if(!message.channel.name !== "createticket") return (await message.reply(" Du kannst hier kein ticket erstellen!")).then(msg=>msg.delete({timout:"5000"}));

        message.delete();

        let category = message.guild.channels.cache.find(ct=>ct.name === "tickets" && ct.type === "category");

        if(!category) await message.guild.channels.create("tickets", {type:"category"}).then(cat=>category = cat);

        if(message.guild.channels.cache.find(cha=>cha.name==`ticket-${username.toLowerCase()}`)) return message.reply("Du hast bereits ein Ticket erstellt").then(msg=>msg.delete({timout:"5000"}));

        let supporterRole = message.guild.roles.cache.find(rl=>rl.name==="Helfer Katze");

        if(!supporterRole) return message.reply("ich konnte keine Supporterrolle finden").then(msg=>msg.delete({timout:"5000"}));


        await message.guild.channels.create(`ticket-${message.author.username}`,{type:"text"}).then(ch=>{
            ch.setParent(category);
            ch.overwritePermissions([
                {
                    id:message.guild.id,
                    deny:["SEND_MESSAGES","VIEW_CHANNEL","ATTACH_FILES"]
                },
                {
                    id:message.author.id,
                    allow:["SEND_MESSAGES","VIEW_CHANNEL","ATTACH_FILES"]

                }
            ]);

            ch.send(`Hey <@${supporterRole.id}>, Hier braucht jemand Hilfe!`);

        }).catch(err=>{
            if(err) return  message.channel.send("ein fehler ist aufgetreten: "+err);
        })

        message.reply("Bitte begebe dich in den für dich erstellten Ticket channel und beschreibe Dein problem/Frage").then(msg=>msg.delete({timout:"10000"}));
    }

    if(message.content.startsWith("!closeticket")){
        let rawusername = message.author.username.split("").slice(0);

        let username = "";

        for(i=0;i<rawusername.length;i++){
            if(rawusername[i].toLowerCase() == "a"
            || rawusername[i].toLowerCase() == "b"
            || rawusername[i].toLowerCase() == "c"
            || rawusername[i].toLowerCase() == "d"
            || rawusername[i].toLowerCase() == "e"
            || rawusername[i].toLowerCase() == "f"
            || rawusername[i].toLowerCase() == "g"
            || rawusername[i].toLowerCase() == "h"
            || rawusername[i].toLowerCase() == "i"
            || rawusername[i].toLowerCase() == "j"
            || rawusername[i].toLowerCase() == "k"
            || rawusername[i].toLowerCase() == "l"
            || rawusername[i].toLowerCase() == "m"
            || rawusername[i].toLowerCase() == "n"
            || rawusername[i].toLowerCase() == "o"
            || rawusername[i].toLowerCase() == "p"
            || rawusername[i].toLowerCase() == "q"
            || rawusername[i].toLowerCase() == "r"
            || rawusername[i].toLowerCase() == "s"
            || rawusername[i].toLowerCase() == "t"
            || rawusername[i].toLowerCase() == "u"
            || rawusername[i].toLowerCase() == "v"
            || rawusername[i].toLowerCase() == "w"
            || rawusername[i].toLowerCase() == "x"
            || rawusername[i].toLowerCase() == "y"
            || rawusername[i].toLowerCase() == "z"
            || rawusername[i].toLowerCase() == "0"
            || rawusername[i].toLowerCase() == "1"
            || rawusername[i].toLowerCase() == "2"
            || rawusername[i].toLowerCase() == "3"
            || rawusername[i].toLowerCase() == "4"
            || rawusername[i].toLowerCase() == "5"
            || rawusername[i].toLowerCase() == "6"
            || rawusername[i].toLowerCase() == "7"
            || rawusername[i].toLowerCase() == "8"
            || rawusername[i].toLowerCase() == "9"){
                username+=rawusername[i].toLowerCase();
            }
        }

        if(!message.channel.name.includes("ticket") || message.channel.name === "ticket") return;

        if(message.channel.name !== `ticket-${username.toLowerCase()}` && !message.member.roles.cache.find(rl=>r.name==="Katzen Helfer")) return message.reply("Dies ist nicht dein Ticket also kannst du es auch nicht schliessen!").then(msg=>msg.delete({timout:"5000"}));

        await message.channel.send("Ticket wird geschlossen..."),

        await message.channel.delete().catch(err=>{
            if(err) return console.error("Es ist ein Fehler beim löschen des Channels passiert: "+err);
        })



    }

   






})

 //Join message

 bot.on("guildMemberAdd", function(member){

    let channel = member.guild.channels.cache.find(ch=>ch.name === "│neue-katzen");
    channel.send({
embed: {
title: "Willkommen",
color: "ORANGE",

description: "Willkommen im Katzen Café " + member.displayName,
footer: "Katzen Café"
}})

    //Starter Role
    let role = member.guild.roles.cache.find(rl=>rl.name === "Normi Katze");
    member.roles.add(role)
})



    




        

    
    
    









    bot.login(process.env.token);