const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');

var prefix = ayarlar.prefix;


client.on('ready', () => {
  console.log(`BOT: Aktif!`);
  console.log(`BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setGame(prefix + 'yardım');
  console.log(`BOT: Oyun ismi ayarlandı!`);
  client.user.setStatus("dnd");
  console.log(`BOT: Mesaj gönderildi!`);
  console.log("BOT: Şu an " + client.channels.size + " adet kanala ve " + client.guilds.size + " adet sunucuya hizmet veriliyor!");
});

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  hoş geldin ^^');
  }
});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on('message', msg => {
  const args = msg.content.split(" ").slice(1);
  const message = msg

  if (msg.content.startsWith(prefix + "eval")) {
    if (msg.author.id !== ayarlar.yapimci) {
      if (msg.author.id !== "217641730818703361") {
      const evala = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(':warning: Uyarı :warning:', 'Bu komutu kullanabilmek için `Bot Sahibi` yetkisine sahip olmalısın.')
    return msg.channel.sendEmbed(evala);
    }}
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      msg.channel.sendCode("xl", clean(evaled));
    } catch (err) {
      msg.channel.sendMessage(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'ping') {
    if (msg.channel.type !== "dm") {
      const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(':ping_pong: Pong!', 'Özel mesajlarını kontrol et. :postbox:');
    msg.channel.sendEmbed(ozelmesajkontrol) }
      const pingozel = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField('Ping:', '**' + client.ping + '**') 
    return msg.author.sendEmbed(pingozel);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'sunucubilgi') {
    if  (msg.channel.type === 'dm') {
      const ozelmesajuyarii = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(':warning: Uyarı :warning:', 'Bu komutu özel mesajlarda kullanamazsın.')
    msg.author.sendEmbed(ozelmesajuyarii); }
    if (msg.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(msg.guild.name, msg.guild.iconURL)
    .addField('Ad:', msg.guild.name)
    .addField('ID', msg.guild.id)
    .addField('Ana kanal:', msg.guild.defaultChannel)
    .addField('Bölge', msg.guild.region)
    .addField('Üye sayısı:', msg.guild.memberCount)
    .addField('Sahibi:', msg.guild.owner)
    .addField('Kanal sayısı:', msg.guild.channels.size)
    .addField('Oluşturulma tarihi:', msg.guild.createdAt)
    return  msg.channel.sendEmbed(sunucubilgi);
    }
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'kullanıcıbilgim')
    if (msg.channel.type !== "group") {
        var Durum = msg.author.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdışı") : (Durum == "idle" ? ("Boşta") : (Durum == "dnd" ? ("Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))))
      const kullanicibilgimk = new Discord.RichEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .setColor(Durm)
      .setTimestamp()
      .addField('Ad:', msg.author.username + '#' + msg.author.discriminator)
      .addField('ID:', msg.author.id)
      .addField('Kayıt tarihi:', msg.author.createdAt)
      .addField('Durum:', durm)
      .addField('Şu an oynadığı oyun:', msg.author.presence.game ? msg.author.presence.game.name : 'Şu an oyun oynamıyor')
      .addField('BOT mu?', msg.author.bot ? '\n Evet' : 'Hayır')
      console.log("!kullanıcıbilgim komutu " + msg.author.username + " tarafından kullanıldı.")
      return msg.channel.sendEmbed(kullanicibilgimk);
  }
});

/*client.on('message', msg => {
  const args = msg.content.split(" ").slice(1);
  if (msg.content.toLowerCase() === prefix + 'kullanıcıbilgi')
    if (!msg.isMentioned) {
      msg.reply('**Doğru kullanım:** !kullanıcıbilgi <@Discord#0000>')
    }
    if (msg.channel.type !== "dm") {
        const Durum = msg.member.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdışı") : (Durum == "idle" ? ("Boşta") : (Durum == "dnd" ? ("Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))))
      const kullanicibilgimk = new Discord.RichEmbed()
      .setAuthor(msg.member.username, msg.member.avatarURL)
      .setColor(Durm)
      .setTimestamp()
      .addField('Ad:', msg.member.username + '#' + msg.member.discriminator)
      .addField('ID:', msg.member.id)
      .addField('Kayıt tarihi:', msg.member.createdAt)
      .addField('Durum:', durm)
      .addField('Şu an oynadığı oyun:', msg.member.presence.game ? msg.member.presence.game.name : 'Şu an oyun oynamıyor')
      .addField('BOT mu?', msg.member.bot ? '\n Evet' : 'Hayır')
      console.log("!kullanıcıbilgim komutu " + msg.member.username + " tarafından kullanıldı.")
      return msg.channel.sendEmbed(kullanicibilgimk);
  }
}); */

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'temizle') {
    if (msg.channel.type === 'dm') {
      const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(':warning: Uyarı :warning:', 'Bu komutu özel mesajlarda kullanamazsın.')
    msg.author.sendEmbed(ozelmesajuyari); }
      if (msg.channel.type !== 'dm') {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
          if (msg.author.id !== ayarlar.yapimci) {
            const mesajlariyonet = new Discord.RichEmbed()
          .setColor(0xFF0000)
          .setTimestamp()
          .setAuthor(msg.author.username, msg.author.avatarURL)
          .addField(':warning: Uyarı :warning:', 'Bu komutu kulllanmak için `Mesajları Yönet` iznine sahip olmalısın.')
          return msg.author.sendEmbed(mesajlariyonet);
      }}
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100); //1000 mesaj gg
      const sohbetsilindi = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Eylem:', 'Sohbet silme')
    .addField('Yetkili:', msg.author.username)
    .addField('Sonuç:', `Başarılı`)
    return msg.channel.sendEmbed(sohbetsilindi);
      console.log("Sohbet " + msg.member + " tarafından silindi!");
}}});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'reload') {
    if (msg.author.id !== ayarlar.yapimci) {
      const blnmyn = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(':warning: Uyarı :warning:', 'Bu komutu kullanabilmek için `Bot Sahibi` yetkisine sahip olmalısın.')
    return msg.channel.sendEmbed(blnmyn);
    }
    process.exit(1).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'restart') {
    if (msg.author.id !== ayarlar.yapimci) {
       const botsahib = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(':warning: Uyarı :warning:', 'Bu komutu kullanabilmek için `Bot Sahibi` yetkisine sahip olmalısın.')
    return msg.channel.sendEmbed(botsahib);
    }
    client.channels.get(ayarlar.botdurum).sendMessage("@everyone Görevli yeniden başlatılıyor kesintiden dolayı özür dileriz...").then(message => {
      console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Gönderilen mesaj: ${message.content}`)
      process.exit(1);
    }).catch(console.error)
  }
});

client.on("disconnected", function () {
	console.log("BOT: Sunucular/sunucu ile bağlantı koptu!");
	process.exit(1);
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'yardım') {
    if (msg.channel.type !== 'dm') {
      const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(msg.author.username, 'Özel mesajlarını kontrol et. :postbox:');
    msg.channel.sendEmbed(ozelmesajkontrol) }
      msg.author.sendMessage('Sanırım yardım istedin? ' + prefix + 'komutlar yazarak komutlara bakabilirsin Başka bir konuda yardım istiyorsan moderatörlerimiz sana yardımcı olacaktır.').then(message => console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'komutlar') {
    if (msg.channel.type !== 'dm') {
      const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(msg.author.username, 'Özel mesajlarını kontrol et. :postbox:');
    msg.channel.sendEmbed(ozelmesajkontrol) }
      msg.author.sendMessage('`Komutlar:\n\n' + prefix + 'yardım\n' + prefix + 'komutlar\n' + prefix + 'bilgi\n' + prefix + 'ping\n' + prefix + 'kurallar\n' + prefix + 'davet\n' + prefix + 'botu ekle\n`').then(message => console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'kurallar') {
    if (msg.channel.type !== 'dm') {
      const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(msg.author.username, 'Özel mesajlarını kontrol et. :postbox:');
    msg.channel.sendEmbed(ozelmesajkontrol) }
      msg.author.sendMessage(ayarlar.kurallar).then(message => console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'davet') {
    if (msg.channel.type !== 'dm') {
      const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(msg.author.username, 'Özel mesajlarını kontrol et. :postbox:');
    msg.channel.sendEmbed(ozelmesajkontrol) }
      msg.author.sendMessage("Link: https://discordapp.com/oauth2/authorize?client_id=288310817810546699&scope=bot&permissions=401812495").then(message => console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'botu ekle') {
    if (msg.channel.type !== 'dm') {
      const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(msg.author.username, 'Özel mesajlarını kontrol et. :postbox:');
    msg.channel.sendEmbed(ozelmesajkontrol) }
      msg.author.sendMessage("Link: https://discordapp.com/oauth2/authorize?client_id=288310817810546699&scope=bot&permissions=401812495").then(message => console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'invite') {
    if (msg.channel.type !== 'dm') {
      const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(msg.author.username, 'Özel mesajlarını kontrol et. :postbox:');
    msg.channel.sendEmbed(ozelmesajkontrol) }
      msg.author.sendMessage("Link: https://discordapp.com/oauth2/authorize?client_id=288310817810546699&scope=bot&permissions=401812495").then(message => console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'bilgi') {
    if (msg.channel.type !== 'dm') {
      const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(msg.author.username, 'Özel mesajlarını kontrol et. :postbox:');
    msg.channel.sendEmbed(ozelmesajkontrol) }
      msg.author.sendMessage('Bot sürümü: v' + ayarlar.surum + ' Yapımcı: Serhan (Black Monday) **Sohbet ve Oyun**\n\n_**BOTU EKLEMEK İÇİN LİNK:**_\n\nhttps://discordapp.com/oauth2/authorize?client_id=288310817810546699&scope=bot&permissions=401812495 \n\n_**Linkler:**_\n\n**Sohbet ve Oyun** sunucusunun davet linki: https://discord.gg/GEeGjnH \nBotun davet linki: https://discordapp.com/oauth2/authorize?client_id=288310817810546699&scope=bot&permissions=401812495 \n\n**:copyright: 2017 Sohbet ve Oyun**').then(message => console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

const girismesaj = [
  '**Sohbet ve Oyun BOT sunucunuza eklendi!**',
  '**Sohbet ve Oyun BOT** sunucunuzdaki insanlara kolaylıklar sağlar.',
  'Bot Serhan E. tarafından geliştirilmektedir (https://serhan.pw)',
  'Botumuzun özelliklerini öğrenmek için !yardım komutunu kullanabilirsin.',
  '**ÖNEMLİ:** Botun kullanması için mod-log kanalı açın ve deneme için',
  'birine ban atın ya da bir banlı kişinin banını kaldırın.',
  '',
  `**Sohbet ve Oyun BOT Resmî Discord Sunucusu** https://discord.gg/GvfuXmE`,
  `**BOT Davet Link** https://discordapp.com/oauth2/authorize?client_id=288310817810546699&scope=bot&permissions=401812495`
]

client.on('guildCreate', guild => {
    const generalChannel = guild.defaultChannel
    generalChannel.sendMessage(girismesaj)
})


client.login(ayarlar.token);
