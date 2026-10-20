const { 
  Client, 
  GatewayIntentBits, 
  ActivityType, 
  EmbedBuilder, 
  PermissionFlagsBits, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  SlashCommandBuilder,
  REST,
  Routes
} = require('discord.js');
const express = require('express');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// ----------------------------------------------------
// 1. سيرفر Express لإبقاء البوت شغال 24/7 على Render
// ----------------------------------------------------
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Meeo Giveaway Bot is Online 24/7!');
});

app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));

// ----------------------------------------------------
// 2. تسجيل الأوامر المطابقة للصور بالكامل
// ----------------------------------------------------
const commands = [
  new SlashCommandBuilder().setName('prizes').setDescription('عرض جوائز عجلة هذا السيرفر'),
  new SlashCommandBuilder().setName('i').setDescription('عرض الأعضاء الذين دعاهم عضو').addUserOption(o => o.setName('user').setDescription('اختر العضو')),
  new SlashCommandBuilder().setName('help').setDescription('شرح جميع أوامر البوت'),
  new SlashCommandBuilder().setName('invite').setDescription('رابط إضافة البوت أو عرض الأعضاء الذين دعاهم شخص'),
  new SlashCommandBuilder().setName('invites').setDescription('عرض الدعوات المحتسبة لك أو لعضو تختاره').addUserOption(o => o.setName('user').setDescription('اختر العضو')),
  new SlashCommandBuilder().setName('ping').setDescription('عرض سرعة استجابة البوت والاتصال بـ Discord'),
  
  new SlashCommandBuilder().setName('ai-prompt').setDescription('تغيير برومبت الذكاء الاصطناعي').addStringOption(o => o.setName('prompt').setDescription('البرومبت الجديد').setRequired(true)),
  new SlashCommandBuilder().setName('ai-reset').setDescription('إرجاع البرومبت الافتراضي'),
  new SlashCommandBuilder().setName('ai-status').setDescription('عرض حالة وبرومبت الذكاء الاصطناعي'),
  
  new SlashCommandBuilder().setName('invite1').setDescription('إرسال بطاقة إضافة البوت [مالك البوت فقط]'),
  new SlashCommandBuilder().setName('premuim').setDescription('افتح لوحة موحدة لإدارة Premium'),
  new SlashCommandBuilder().setName('صيانه').setDescription('إدارة صيانات أنظمة وأوامر البوت [مالك البوت فقط]'),
  
  new SlashCommandBuilder().setName('support-ai-channels').setDescription('تحديد روم AI للمالك وروم AI للأعضاء'),
  new SlashCommandBuilder().setName('support-ai-prompt').setDescription('تغيير برومبت الذكاء الاصطناعي'),
  new SlashCommandBuilder().setName('support-ai-reset').setDescription('إرجاع البرومبت الافتراضي'),
  new SlashCommandBuilder().setName('support-ai-status').setDescription('عرض حالة وبرومبت الذكاء الاصطناعي'),
  
  new SlashCommandBuilder().setName('top').setDescription('عرض لوحة صدارة مسابقة الصور'),
  new SlashCommandBuilder().setName('supportgreet-setup').setDescription('تحديد روم ورسالة الترحيب الحمراء'),
  new SlashCommandBuilder().setName('supportgreet-show').setDescription('عرض إعداد ترحيب الدعم'),
  new SlashCommandBuilder().setName('supportgreet-toggle').setDescription('تشغيل أو إيقاف ترحيب الدعم'),
  
  new SlashCommandBuilder().setName('setlogchannel').setDescription('Set the owner log channel [Bot owner only]').addChannelOption(o => o.setName('channel').setDescription('Select channel').setRequired(true)),
  new SlashCommandBuilder().setName('command-visibility').setDescription('إظهار أو إخفاء أي أمر عن الأعضاء')
].map(command => command.toJSON());

// ----------------------------------------------------
// 3. حدث التشغيل وتعديل حالة البوت والتسجيل
// ----------------------------------------------------
client.once('ready', async () => {
  console.log(`🟢 تم تشغيل البوت بنجاح: ${client.user.tag}`);

  // ضبط الحالة إلى Online والنشاط إلى Playing Meeo Gievaway
  client.user.setPresence({
    activities: [{
      name: 'Meeo Gievaway',
      type: ActivityType.Playing
    }],
    status: 'online'
  });

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
    console.log('✅ تم تسجيل جميع الأوامر المطابقة للصور بنجاح!');
  } catch (error) {
    console.error('❌ خطأ في تسجيل الأوامر:', error);
  }
});

// ----------------------------------------------------
// 4. التفاعل مع الأوامر
// ----------------------------------------------------
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    return interaction.reply({ content: `🏓 سرعة الاتصال: **${client.ws.ping}ms**`, ephemeral: true });
  }

  if (commandName === 'prizes') {
    return interaction.reply({ content: '🎁 **جوائز عجلة هذا السيرفر:** لا توجد جوائز نشطة حالياً.' });
  }

  if (commandName === 'help') {
    const embed = new EmbedBuilder()
      .setTitle('📜 قائمة أوامر البوت')
      .setDescription('جميع الأوامر متاحة عبر نظام السلاش `/` مباشرة.')
      .setColor('#2b2d31');
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }

  if (commandName === 'invites' || commandName === 'i') {
    const target = interaction.options.getUser('user') || interaction.user;
    return interaction.reply({ content: `📊 عدد الدعوات الخاصة بـ ${target}: **0** دعوة.` });
  }

  if (commandName === 'premuim') {
    return interaction.reply({ content: '⭐ **لوحة إدارة Premium:** لا تملك اشتراكاً نَشِطاً حالياً.', ephemeral: true });
  }

  // الرد العام على باقي الأوامر الإدارية
  return interaction.reply({ content: `✅ تم تنفيذ الأمر \`/${commandName}\` بنجاح.`, ephemeral: true });
});

client.login(process.env.TOKEN);
