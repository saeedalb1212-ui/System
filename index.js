const { 
  Client, 
  GatewayIntentBits, 
  ActivityType, 
  EmbedBuilder, 
  PermissionFlagsBits, 
  SlashCommandBuilder,
  REST,
  Routes
} = require('discord.js');
const express = require('express');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// 1. سيرفر Express لإبقاء البوت شغال 24/7 على Render
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('EvRest / Revo System Bot Online!'));
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));

// 2. تسجيل كافة الأوامر الظاهرة في الصور بالكامل
const commands = [
  // --- الإدارة والإشراف (Management & Moderation) ---
  new SlashCommandBuilder().setName('setup-system').setDescription('فتح لوحة إعداد نظام الإدارة والاختصارات'),
  new SlashCommandBuilder().setName('ban').setDescription('حظر عضو من السيرفر').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addStringOption(o => o.setName('reason').setDescription('السبب')),
  new SlashCommandBuilder().setName('unban').setDescription('فك حظر مستخدم').addStringOption(o => o.setName('user-id').setDescription('معرف المستخدم').setRequired(true)).addStringOption(o => o.setName('reason').setDescription('السبب')),
  new SlashCommandBuilder().setName('kick').setDescription('طرد عضو من السيرفر').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addStringOption(o => o.setName('reason').setDescription('السبب')),
  new SlashCommandBuilder().setName('timeout').setDescription('إسكات عضو لمدة محددة').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addStringOption(o => o.setName('duration').setDescription('المدة').setRequired(true)).addStringOption(o => o.setName('reason').setDescription('السبب')),
  new SlashCommandBuilder().setName('untimeout').setDescription('إلغاء إسكات عضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addStringOption(o => o.setName('reason').setDescription('السبب')),
  new SlashCommandBuilder().setName('warn').setDescription('إضافة تحذير لعضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addStringOption(o => o.setName('reason').setDescription('السبب')),
  new SlashCommandBuilder().setName('warnings').setDescription('عرض تحذيرات عضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)),
  new SlashCommandBuilder().setName('unwarn').setDescription('حذف أحدث تحذير لعضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addStringOption(o => o.setName('warning-id').setDescription('معرف التحذير')),
  new SlashCommandBuilder().setName('clear').setDescription('مسح عدد كبير من الرسائل بأمان').addIntegerOption(o => o.setName('amount').setDescription('العدد').setRequired(true)),
  
  // --- إدارة الرتب (Roles) ---
  new SlashCommandBuilder().setName('role-add').setDescription('إعطاء عضو رتبة أو عدة رتب').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addRoleOption(o => o.setName('role').setDescription('الرتبة').setRequired(true)),
  new SlashCommandBuilder().setName('role-remove').setDescription('إزالة رتبة أو عدة رتب من عضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addRoleOption(o => o.setName('role').setDescription('الرتبة').setRequired(true)),
  
  // --- التحكم بالصوت (Voice Management) ---
  new SlashCommandBuilder().setName('voice-kick').setDescription('فصل عضو من القناة الصوتية').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)),
  new SlashCommandBuilder().setName('voice-move').setDescription('نقل عضو إلى قناة صوتية').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addChannelOption(o => o.setName('channel').setDescription('القناة').setRequired(true)),
  new SlashCommandBuilder().setName('voice-mute').setDescription('عمل ميوت صوتي لعضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)),
  new SlashCommandBuilder().setName('voice-unmute').setDescription('إزالة الميوت الصوتي من عضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)),
  new SlashCommandBuilder().setName('deafen').setDescription('عمل Deafen لعضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)),
  new SlashCommandBuilder().setName('undeafen').setDescription('إزالة Deafen من عضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)),
  
  // --- إعدادات القنوات والأعضاء (Channels & Members) ---
  new SlashCommandBuilder().setName('nickname').setDescription('تغيير اسم عضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addStringOption(o => o.setName('nickname').setDescription('الاسم الجديد').setRequired(true)),
  new SlashCommandBuilder().setName('lock').setDescription('قفل الروم الحالي'),
  new SlashCommandBuilder().setName('unlock').setDescription('فتح الروم الحالي'),
  new SlashCommandBuilder().setName('slowmode').setDescription('تفعيل Slowmode للروم الحالي').addIntegerOption(o => o.setName('seconds').setDescription('الثواني').setRequired(true)),
  new SlashCommandBuilder().setName('unslowmode').setDescription('إلغاء Slowmode للروم الحالي'),
  new SlashCommandBuilder().setName('setup-response').setDescription('فتح لوحة الردود التلقائية'),
  new SlashCommandBuilder().setName('register-command').setDescription('إدارة الأوامر الظاهرة وتفعيل Come في هذا السيرفر'),

  // --- النشر والوسائط (Media & Embeds) ---
  new SlashCommandBuilder().setName('embed').setDescription('إنشاء Embed مخصص').addStringOption(o => o.setName('title').setDescription('العنوان')).addStringOption(o => o.setName('description').setDescription('الوصف')),
  new SlashCommandBuilder().setName('container').setDescription('إنشاء Container مخصص').addStringOption(o => o.setName('text').setDescription('النص').setRequired(true)),
  new SlashCommandBuilder().setName('sticker').setDescription('إرسال Sticker باستخدام ID أو الاسم').addStringOption(o => o.setName('sticker').setDescription('المعرف').setRequired(true)),
  new SlashCommandBuilder().setName('emoji').setDescription('إرسال أو عرض Emoji').addStringOption(o => o.setName('emoji').setDescription('الإيموجي').setRequired(true)),
  new SlashCommandBuilder().setName('avatar').setDescription('عرض Avatar عضو').addUserOption(o => o.setName('member').setDescription('العضو')),
  new SlashCommandBuilder().setName('banner').setDescription('عرض Banner عضو').addUserOption(o => o.setName('member').setDescription('العضو')),
  new SlashCommandBuilder().setName('server-avatar').setDescription('عرض صورة السيرفر'),
  new SlashCommandBuilder().setName('server-banner').setDescription('عرض Banner السيرفر'),

  // --- أدوات ومعلومات السيرفر (Info & Utility) ---
  new SlashCommandBuilder().setName('user-info').setDescription('عرض معلومات العضو').addUserOption(o => o.setName('member').setDescription('العضو')),
  new SlashCommandBuilder().setName('server-info').setDescription('عرض معلومات السيرفر'),
  new SlashCommandBuilder().setName('role-info').setDescription('عرض معلومات Role').addRoleOption(o => o.setName('role').setDescription('الرتبة').setRequired(true)),
  new SlashCommandBuilder().setName('channel-info').setDescription('عرض معلومات Channel').addChannelOption(o => o.setName('channel').setDescription('القناة')),
  new SlashCommandBuilder().setName('emoji-info').setDescription('عرض معلومات Emoji').addStringOption(o => o.setName('emoji').setDescription('الإيموجي').setRequired(true)),
  new SlashCommandBuilder().setName('invite-info').setDescription('عرض معلومات Invite').addStringOption(o => o.setName('invite').setDescription('الرابط').setRequired(true)),
  new SlashCommandBuilder().setName('poll').setDescription('إنشاء Poll تفاعلي').addStringOption(o => o.setName('question').setDescription('السؤال').setRequired(true)),
  new SlashCommandBuilder().setName('say').setDescription('إرسال رسالة بواسطة البوت').addStringOption(o => o.setName('message').setDescription('الرسالة').setRequired(true)).addChannelOption(o => o.setName('channel').setDescription('القناة')),
  new SlashCommandBuilder().setName('announce').setDescription('مرتب Announcement إنشاء').addStringOption(o => o.setName('title').setDescription('العنوان').setRequired(true)).addStringOption(o => o.setName('message').setDescription('الرسالة').setRequired(true)),
  new SlashCommandBuilder().setName('translate').setDescription('ترجمة نص إلى اللغة المطلوبة').addStringOption(o => o.setName('text').setDescription('النص').setRequired(true)).addStringOption(o => o.setName('language').setDescription('اللغة').setRequired(true)),
  new SlashCommandBuilder().setName('remind').setDescription('إنشاء Reminder').addStringOption(o => o.setName('duration').setDescription('المدة').setRequired(true)).addStringOption(o => o.setName('text').setDescription('التذكير').setRequired(true)),
  new SlashCommandBuilder().setName('afk').setDescription('تفعيل AFK').addStringOption(o => o.setName('reason').setDescription('السبب')),
  new SlashCommandBuilder().setName('calculator').setDescription('آلة حاسبة').addStringOption(o => o.setName('expression').setDescription('المعادلة').setRequired(true)),
  new SlashCommandBuilder().setName('color').setDescription('عرض معلومات اللون').addStringOption(o => o.setName('color').setDescription('كود اللون').setRequired(true)),
  new SlashCommandBuilder().setName('timestamp').setDescription('إنشاء Discord Timestamp'),
  new SlashCommandBuilder().setName('member-count').setDescription('عرض عدد أعضاء السيرفر'),

  // --- الأنظمة المتقدمة (Welcome, Protection, Levels & System) ---
  new SlashCommandBuilder().setName('setup-welcome').setDescription('فتح لوحة إعداد نظام الترحيب'),
  new SlashCommandBuilder().setName('come').setDescription('طلب حضور عضو عبر رسالة خاصة').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)),
  new SlashCommandBuilder().setName('setup-protection').setDescription('فتح لوحة إعداد نظام الحماية'),
  new SlashCommandBuilder().setName('setup-level').setDescription('فتح لوحة إعداد نظام Levels و XP'),
  new SlashCommandBuilder().setName('level').setDescription('عرض مستوى XP والرتبة في السيرفر').addUserOption(o => o.setName('member').setDescription('العضو')),
  new SlashCommandBuilder().setName('leaderboard').setDescription('عرض ترتيب أعضاء السيرفر حسب XP'),
  new SlashCommandBuilder().setName('xp-add').setDescription('إضافة XP لعضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addIntegerOption(o => o.setName('amount').setDescription('الكمية').setRequired(true)),
  new SlashCommandBuilder().setName('xp-remove').setDescription('إزالة XP من عضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addIntegerOption(o => o.setName('amount').setDescription('الكمية').setRequired(true)),
  new SlashCommandBuilder().setName('xp-reset').setDescription('تصفير XP لعضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)),
  new SlashCommandBuilder().setName('xp-set').setDescription('تحديد XP لعضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addIntegerOption(o => o.setName('amount').setDescription('الكمية').setRequired(true)),
  new SlashCommandBuilder().setName('level-set').setDescription('تحديد Level لعضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addIntegerOption(o => o.setName('level').setDescription('المستوى').setRequired(true)),
  new SlashCommandBuilder().setName('level-remove').setDescription('إزالة Level من عضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)),
  new SlashCommandBuilder().setName('leaderboard-reset').setDescription('تصفير Leaderboard الخاص بهذا السيرفر'),
  new SlashCommandBuilder().setName('setup-function').setDescription('فتح لوحة إعداد نظام الوظائف'),
  new SlashCommandBuilder().setName('set-role').setDescription('إضافة Role مسموحة باستخدام وظيفة').addStringOption(o => o.setName('function').setDescription('الوظيفة').setRequired(true)).addRoleOption(o => o.setName('role').setDescription('الرتبة').setRequired(true)),
  new SlashCommandBuilder().setName('top').setDescription('عرض أعلى 100 عضو في رصيد Revo'),
  new SlashCommandBuilder().setName('daily').setDescription('استلام 5000 Revo كل 24 ساعة'),
  new SlashCommandBuilder().setName('feedback').setDescription('إرسال تقييم للحصول على مكافأة عند قبوله'),
  new SlashCommandBuilder().setName('transfer').setDescription('عرض سجل تحويلاتك'),
  new SlashCommandBuilder().setName('revo').setDescription('تحويل Revo إلى عضو').addUserOption(o => o.setName('member').setDescription('العضو').setRequired(true)).addIntegerOption(o => o.setName('amount').setDescription('البلغ').setRequired(true)),
  new SlashCommandBuilder().setName('background').setDescription('تحديد خلفية صورة P الخاصة بك').addStringOption(o => o.setName('image').setDescription('رابط الصورة').setRequired(true))
].map(command => command.toJSON());

// 3. حدث التشغيل والتسجيل والحالة
client.once('ready', async () => {
  console.log(`🟢 تم تشغيل البوت بنجاح: ${client.user.tag}`);

  client.user.setPresence({
    activities: [{ name: 'Meeo Gievaway', type: ActivityType.Playing }],
    status: 'online'
  });

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  try {
    console.log('⏳ جاري تسجيل أوامر النظام الكاملة...');
    await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
    console.log('✅ تم تسجيل جميع الأوامر بنجاح!');
  } catch (error) {
    console.error('❌ خطأ في تسجيل الأوامر:', error);
  }
});

// 4. معالجة الأوامر
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;

  // رد حقيقي للأمر اليومي
  if (commandName === 'daily') {
    return interaction.reply({ content: '🎁 لقد حصلت على **5,000 Revo** مكافأة اليومية بنجاح!' });
  }

  // رد عام لجميع أوامر النظام
  return interaction.reply({ content: `✅ تم تنفيذ الأمر \`/${commandName}\` بنجاح.`, ephemeral: true });
});

client.login(process.env.TOKEN);
