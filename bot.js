const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');

var prefix = ayarlar.prefix;


client.on('ready', () => {
  console.log(`BOT: Aktif, Komutlar yüklendi!`);
  console.log(`BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setGame(prefix + 'yardım Yapımcı: Serhan');
  console.log(`BOT: Oyun ismi ayarlandı!`);
  client.user.setStatus("dnd");
  //client.channels.get("264818292684881922").sendMessage("@everyone Merhabalar efendim! Ben buranın görevlisiyim. Yardım istersen !yardım yaz yeter :smiley:").then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
  console.log(`BOT: Mesaj gönderildi!`);
  console.log("BOT: Şu an " + client.channels.size + " adet kanala ve " + client.guilds.size + " adet sunucuya hizmet veriliyor!");
});

client.on('message', msg => {
  if (msg.content === prefix + 'ping') {
    msg.reply('Ping: **' + client.ping + ' ms** (Benim pingim :) )').then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content === prefix + 'gecikme') {
    msg.reply('Gecikme: **' + client.ping + ' ms** (Benim pingim :) )').then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('guildMemberAdd', member => {
    let username = member.user.username;
    member.guild.defaultChannel.send('Hoş geldin **' + username + '**! Buraya arkadaşlarını davet edebilir ve onlarla oyun oynayabilir, yeni arkadaşlar edinip onlarla oyunlar oynayıp sohbet edebilirsin!');
});

client.on('message', msg => {
  if (msg.content === 'sa') {
    msg.reply('Aleyküm selam!').then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content === 'sA') {
    msg.reply('Aleyküm selam!').then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content === 'sea') {
    msg.reply('Aleyküm selam!').then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content === 'Sa') {
    msg.reply('Aleyküm selam!').then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content === 'SA') {
    msg.reply('Aleyküm selam!').then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

//client.on('message', msg => {
  //if (msg.content === prefix + 'temizle') {
  //    let Rol = msg.guild.roles.find("name", "YONET");
    //    if (!msg.member.roles.has(Rol.id)) {
      //      return msg.reply("Bunun için gerekli izne sahip değilsin.").then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
        //}
        //message(1000);
        //msg.channel.sendMessage("Sohbet silindi!").then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
        //console.log("Sohbet " + msg.member + " tarafından silindi!");
//}});

client.on('message', msg => {
  if (msg.content === prefix + 'restart') {
    if (! msg.member.hasPermission("ADMINISTRATOR")) {
      return msg.reply("Bunun için gerekli izne sahip değilsin.").then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error); }
    client.channels.get("287891962088914944").sendMessage("Görevli yeniden başlatılıyor...").then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error)
    process.exit(1);
    }
});

client.on("disconnected", function () {
	console.log("BOT: Sunucular/sunucu ile bağlantı koptu!");
	process.exit(1);
});

client.on('message', msg => {
  if (msg.content === prefix + 'yardım') {
    msg.author.sendMessage('Sanırım yardım istedin? ' + prefix + 'komutlar yazarak komutlara bakabilirsin Başka bir konuda yardım istiyorsan moderatörlerimiz sana yardımcı olacaktır.').then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content === prefix + 'komutlar') {
    msg.author.sendMessage('Komutlar:\n\n' + prefix + 'yardım\n' + prefix + 'komutlar\n' + prefix + 'botbilgi\n' + prefix + 'ping\n' + prefix + 'kurallar').then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content === prefix + 'kurallar') {
    msg.author.sendMessage(ayarlar.kurallar).then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.on('message', msg => {
  if (msg.content === prefix + 'botbilgi') {
    msg.author.sendMessage('Bot sürümü: ' + ayarlar.surum + ' Yapımcı: Serhan (Black Monday) Bu bot **Sohbet ve Oyun** Discord sunucusuna özel yapılmıştır.\n\n**© 2017 Sohbet ve Oyun** https://discord.gg/GEeGjnH').then(message => console.log(`Gönderilen mesaj: ${message.content}`)).catch(console.error);
  }
});

client.login(ayarlar.token);