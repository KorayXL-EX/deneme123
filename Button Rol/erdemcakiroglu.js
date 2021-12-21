const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
const matthe = require('discord-buttons')
matthe(client)

var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`[ Erdem 💙 Button ] bot başarıyla aktif edildi: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

require("./util/eventLoader")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`[ Erdem 💙 Button ] ${files.length} adet komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`[ Erdem 💙 Button ] yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.login(ayarlar.token);

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


client.on("message", (message) => {

    if (message.content !== ".buton" || message.author.bot) return;
  
  let DenemeRol1 = new matthe.MessageButton()
    .setStyle('green') 
    .setLabel('DenemeRol1') 
    .setID('DenemeRol1'); 
  
    let DenemeRol2 = new matthe.MessageButton()
    .setStyle('green') 
    .setLabel('DenemeRol2') 
    .setID('DenemeRol2'); 

  let DenemeRol3 = new matthe.MessageButton()
    .setStyle('green') 
    .setLabel('DenemeRol3') 
    .setID('DenemeRol3');

  
  message.channel.send(`
**A��a��dan Kendinize Rol Se�ebilirsiniz.
 
\`>\` <@&922963350785249360> Rolü Almak İçin Etkinlik Katılımcısı! Butonuna.
\`>\` <@&922963409950081024> Rolü Almak İçin Çekiliş Katılımcısı! Butonuna.
\`>\` <@&922963438882422824> Rolü Almak İçin Duyuru Katılımcısı! Butonuna.


**`, { 
    buttons: [ DenemeRol1, DenemeRol2, DenemeRol3]
});
});
  
client.on('clickButton', async (button) => {

    if (button.id === 'DenemeRol1') {
        if (button.clicker.member.roles.cache.get((ayarlar.EtkinlikKatılımcısı))) {
            await button.clicker.member.roles.remove((ayarlar.EtkinlikKatılımcısı))
            await button.reply.think(true);
            await button.reply.edit("DenemeRol1 rol� ba�ar�yla verilidi")
        } else {
            await button.clicker.member.roles.add(((ayarlar.EtkinlikKatılımcısı)))
            await button.reply.think(true);
            await button.reply.edit("DenemeRol1 rol� ba�ar�yla al�nd�")
        }
    }
  
      if (button.id === 'DenemeRol2') {
        if (button.clicker.member.roles.cache.get((ayarlar.DuyuruKatılımcısı))) {
            await button.clicker.member.roles.remove((ayarlar.DuyuruKatılımcısı))
            await button.reply.think(true);
            await button.reply.edit("DenemeRol2 rol� ba�ar�yla verildi.")
        } else {
            await button.clicker.member.roles.add(((ayarlar.DuyuruKatılımcısı)))
            await button.reply.think(true);
            await button.reply.edit("DenemeRol2 rol� ba�ar�yla al�nd�.")
        }
    }


    if (button.id === 'DenemeRol3') {
        if (button.clicker.member.roles.cache.get((ayarlar.ÇekilişKatılımcısı))) {
            await button.clicker.member.roles.remove((ayarlar.ÇekilişKatılımcısı))
            await button.reply.think(true);
            await button.reply.edit("DenemeRol3 rol� ba�ar�yla verildi.")
        } else {
            await button.clicker.member.roles.add((ayarlar.ÇekilişKatılımcısı))
            await button.reply.think(true);
            await button.reply.edit("DenemeRol3 rol� ba�ar�yla al�nd�.")
        }

    }

});