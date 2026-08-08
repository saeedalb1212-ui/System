const Discord = require('discord.js')
const client = new Discord.Client()

const prefix = "!";
client.on("ready", () => {
  console.log(`${client.user.username} READY BOT FOR GAMES :) `)
})

client.on("message", async message => {
  if (message.content === prefix + "help") {
    const embed = new Discord.MessageEmbed()
      .setAuthor("Commands:", client.user.avatarURL())
      .setThumbnail(message.author.avatarURL())
      .setColor("BLUE")
         .addField(`${prefix}اسرع`,`لعبة سرعة كتابة الكلمات`,true)
      .addField(`${prefix}فكك`,`لعبة تفكيك الكلمات`,true)
      .addField(`${prefix}لغز`,`لعبة الألغاز`,true)
      .addField(`${prefix}ركب`,"لعبة تركيب الكلمات",true)
      .addField(`${prefix}اعلام`,"لعبة اعلام الدول ",true)
    message.channel.send(embed)
  }


  if (message.content === prefix + "اسرع") {
   const f=["زومبي","قسطنطينة","حبيبي والله","صراع","مشروع","مثلث","رفرف","الشعر","خنق","لقب","إخفاء","بائع","ثؤلول","فينوس","سلالة","برميل","حب","معدن","تمام","كبسولة","الخيل"]
    let fast = Math.floor(Math.random() * f.length)
    const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor("BLUE")
      .setDescription(`\`\`\`${f[fast]}\`\`\``)
      .setFooter("لديك 15 ثانية للاجابة")
      .setTimestamp()
    message.channel.send(embed)
    const filter = m => m.content.includes(f[fast]);
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 15000,
      errors: ['time'],
    })

      .then((collected) => {
        const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`✅ | <@${collected.first().author.id}> الأجابة صحيحة!`)
        message.channel.send(embed)
      })
      .catch(() => {
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`🕘 | أنتهى الوقت لم تقوم بالاجابة الصحيحة`)
        message.channel.send(embed)
      });
  }

  if (message.content === prefix + "فكك") {
   const f=["زومبي","قسطنطينة","حبيبي والله","صراع","مشروع","مثلث","رفرف","الشعر","خنق","لقب","إخفاء","بائع","ثؤلول","فينوس","سلالة","برميل","حب","معدن","تمام","كبسولة","الخيل"]
    const fk=["ز و م ب ي","ق س ط ن ط ي ن ة","ح ب ي ب ي و ا ل ل ه","ص ر ا ع","م ش ر و ع","م ث ل ث","ر ف ر ف","ا ل ش ع ر","خ ن ق","ل ق ب","إ خ ف ا ء","ب ا ئ ع","ث ؤ ل و ل","ف ي ن و س","س ل ا ل ة","ب ر م ي ل","ح ب","م ع د ن","ت م ا م","ك ب س و ل ة","ا ل خ ي ل"]

    let fkk = Math.floor(Math.random() * f.length)
    const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor("BLUE")
      .setDescription(`\`\`\`${f[fkk]}\`\`\``)
      .setFooter("لديك 15 ثانية للاجابة")
      .setTimestamp()
    message.channel.send(embed)
    const filter = m => m.content.includes(fk[fkk]);
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 15000,
      errors: ['time'],
    })

      .then((collected) => {
        const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`✅ | <@${collected.first().author.id}> الأجابة صحيحة!`)
        message.channel.send(embed)
      })
      .catch(() => {
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`🕘 | أنتهى الوقت لم تقوم بالاجابة الصحيحة`)
        message.channel.send(embed)
      });
  }

  if (message.content === prefix + "ركب") {
const g=["ز و م ب ي","ق س ط ن ط ي ن ة","ح ب ي ب ي و ا ل ل ه","ص ر ا ع","م ش ر و ع","م ث ل ث","ر ف ر ف","ا ل ش ع ر","خ ن ق","ل ق ب","إ خ ف ا ء","ب ا ئ ع","ث ؤ ل و ل","ف ي ن و س","س ل ا ل ة","ب ر م ي ل","ح ب","م ع د ن","ت م ا م","ك ب س و ل ة","ا ل خ ي ل"]
   const gm=["زومبي","قسطنطينة","حبيبي والله","صراع","مشروع","مثلث","رفرف","الشعر","خنق","لقب","إخفاء","بائع","ثؤلول","فينوس","سلالة","برميل","حب","معدن","تمام","كبسولة","الخيل"]

    let gm3 = Math.floor(Math.random() * g.length)
    const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor("BLUE")
      .setDescription(`\`\`\`${g[gm3]}\`\`\``)
      .setFooter("لديك 15 ثانية للاجابة")
      .setTimestamp()
    message.channel.send(embed)
    const filter = m => m.content.includes(gm[gm3]);
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 15000,
      errors: ['time'],
    })

      .then((collected) => {
        const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`✅ | <@${collected.first().author.id}> الأجابة صحيحة!`)
        message.channel.send(embed)
      })
      .catch(() => {
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`🕘 | أنتهى الوقت لم تقوم بالاجابة الصحيحة`)
        message.channel.send(embed)
      });

  }

  if (message.content === prefix + "اعلام") {
    const a=["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Iraq.svg/560px-Flag_of_Iraq.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/560px-Flag_of_Algeria.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Flag_of_Syria.svg/560px-Flag_of_Syria.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Yemen.svg/560px-Flag_of_Yemen.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Yemen.svg/560px-Flag_of_Yemen.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Flag_of_Lebanon.svg/560px-Flag_of_Lebanon.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/560px-Flag_of_Egypt.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/560px-Flag_of_the_United_Arab_Emirates.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/560px-Flag_of_the_People%27s_Republic_of_China.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/560px-Flag_of_France.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/560px-Flag_of_Germany.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/560px-Flag_of_Russia.svg.png","https://media.discordapp.net/attachments/1011820688987914242/1057873633294422156/jp.png","https://media.discordapp.net/attachments/1011820688987914242/1057873632921124955/pt.png","https://media.discordapp.net/attachments/1011820688987914242/1057873631390208020/hr.png","https://media.discordapp.net/attachments/1011820688987914242/1057873632040333352/vn.png","https://media.discordapp.net/attachments/1011820688987914242/1057873632526864464/tw.png"]
   const a3=["العراق","الجزائر","سوريا","اليمن","لبنان","تركيا","مصر","الإمارات","الصين","فرنسا","المانيا","روسيا","اليابان","البرتغال","كرواتيا","فيتنام","تايوان"]

    let a3l = Math.floor(Math.random() * a.length)
    const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor("BLUE")
      .setImage(a[a3l])
      .setFooter("لديك 15 ثانية للاجابة")
      .setTimestamp()
    message.channel.send(embed)
    const filter = m => m.content.includes(a3[a3l]);
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 15000,
      errors: ['time'],
    })

      .then((collected) => {
        const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`✅ | <@${collected.first().author.id}> الأجابة صحيحة!`)
        message.channel.send(embed)
      })
      .catch(() => {
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`🕘 | أنتهى الوقت لم تقوم بالاجابة الصحيحة`)
        message.channel.send(embed)
      });
  }

  if (message.content === prefix + "لغز") {
   const p=["شيء موجود في السماء إذا أضفت إليه حرفا أصبح في الأرض؟","ما هو الشيء الذي يوصلك من بيتك إلى عملك دون أن يتحرك؟","تاجر من التجار إذا اقتلعنا عينه طار. فمن هو؟","ما هو الشيء الذي ترميه كلما احتجت إليه؟","يسير بلا رجلين و لا يدخل إلا بالأذنين ما هو؟","ما هو الشي الذي يكتب و لا يقر؟","من هو الحيوان الذي يحك إذنه بأنفه؟","ما هو الشي الذي كلما كثر لدينا غلا و كلما قل رخص؟","ما هي التي تأكل و لا تشبع؟","ما هو الشي الذي كلما أخذت منه يكبر ؟","ما هو الشي الذي يوجد في وسط باريس؟","ما هو البيت الذي ليس فيه أبواب و لا نوافذ؟","أين يقع البحر الذي لا يوجد به ماء؟","ماهو الشي الذي ينبض بلا قلب؟","أخت خالك و ليست خالتك من تكون ؟","شيء يحتوي على كلمات، إلا أنه لا يتكلم أبدًا؟","ما هو أمامك دائمًا ولكنك لا تستطيع رؤيته؟","ما الذي يرتفع ولكنه لا ينزل؟"]
  const pu=["نجم","الطريق","عطار","شبكة الصيد","الصوت","القلم","الفيل","العقل","النار","الحفرة","راء","بيت الشعر","في الخريطة","الساعه","أمك","كتاب","المستقبل","العمر"]

    let puz = Math.floor(Math.random() * p.length)
    const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor("BLUE")
      .setDescription(`\`\`\`${p[puz]}\`\`\``)
      .setFooter("لديك 15 ثانية للاجابة")
      .setTimestamp()
    message.channel.send(embed)
    const filter = m => m.content.includes(pu[puz]);
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 15000,
      errors: ['time'],
    })

      .then((collected) => {
        const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`✅ | <@${collected.first().author.id}> الأجابة صحيحة!`)
        message.channel.send(embed)
      })
      .catch(() => {
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`🕘 | أنتهى الوقت لم تقوم بالاجابة الصحيحة`)
        message.channel.send(embed)
      });
  }
})
client.login(process.env.token)
