const Discord = require('discord.js')
const client  = new Discord.Client()
Discord.Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`;

const config = require('./config.json')
const command = require('./command')
const welcome = require('./welcome')
const leave = require('./leave')
const poll = require('./poll');
const {MessageEmbed} = require('discord.js')
const fetch = require('node-fetch')
const moment = require('moment');
const guildInvites = new Map();
const FiveM = require('fivem')
const staffids = '498118948370382848' 
const jointocreate = require('./jointocreate')
const jointocreate2 = require('./jointocreate2')
const onduty = "824758221142884442" 
const svr = new FiveM.Server(`${config.ip}:${config.port}`);
prefix =  '!'




client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
  client.guilds.cache.forEach(guild => {
    guild.fetchInvites()
        .then(invites => guildInvites.set(guild.id, invites))
        .catch(err => console.log(err));
          client.user.setActivity("Dexter Roleplay")
   
          client.api.applications(client.user.id).guilds('805558658325807134').commands.post({
            data: {
                name: "developers",
                description: "Για να δείτε ποιοι είναι οι developers του Dexter Roleplay."
            }
        });
  
  
  client.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;

    
    if(command == 'developers') {
      const developers = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription("" 
      + 
      `
      <@551691911140868117> <@&821450382630584422> <@&821450383409938462>

      <@817480853819097128> <@&821450382630584422> <@&821450381758431273> <@&821469245756932168>

      <@498118948370382848>  <@&821450381758431273>

     

      `)
      client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
              type: 4,
              data: await createAPIMessage(interaction, developers)
          }
      });
  }
});


async function createAPIMessage(interaction, content) {
const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
    .resolveData()
    .resolveFiles();

return { ...apiMessage.data, files: apiMessage.files };
}
  command(client, 'leaderboard', (message) => {

    const embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
  .setAuthor("Dexter Roleplay", 'https://cdn.discordapp.com/attachments/819249210267664394/821171515756249158/dexter.gif')
    
    message.channel.send(embed)
  })

  client.on("message", async message => {
    if(message.author.bot) return;
    if(!onduty.includes(message.channel.id)){
  if(!staffids.includes(message.author.id) && message.content === '!onduty'){
  message.delete()
      }else if(staffids.includes(message.author.id)){
        if(message.content == '!onduty'){
          message.delete()
      
          const onduty = new Discord.MessageEmbed()
         .setColor('#4dff00')
         .setDescription(`O ${message.author} μπήκε on duty στις:`)
        .setFooter(message.createdAt)
        
          message.channel.send(onduty);
         message.member.roles.add('826333149411409931')
          
      
    
        }
      }
    }
   else if(onduty.includes(message.channel.id)){
      if(message.content == '!onduty'){
        message.delete()
    
        const onduty = new Discord.MessageEmbed()
        .setColor('#4dff00')
        .setDescription(`O ${message.author} μπήκε on duty στις:`)
        .setFooter(message.createdAt)
       
         message.channel.send(onduty);
         message.member.roles.add('826333149411409931')
      }
  }
  })
 
})
client.on("message", async message => {
  if(message.author.bot) return;
  if(!onduty.includes(message.channel.id)){
if(!staffids.includes(message.author.id) && message.content === '!onduty'){
message.delete()
    }else if(staffids.includes(message.author.id)){
      if(message.content == '!offduty'){
      message.delete()
    
        const onduty = new Discord.MessageEmbed()
       .setColor('#ff0000')
       .setDescription(`O ${message.author} μπήκε on duty στις:`)
      .setFooter(message.createdAt)
      
        message.channel.send(onduty);
       message.member.roles.remove('826333149411409931')
        
   
  
      }
    }
  }
 else if(onduty.includes(message.channel.id)){
    if(message.content == '!offduty'){
      message.delete()
  
      const onduty = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription(`O ${message.author} μπήκε on duty στις:`)
      .setFooter(message.createdAt)
     
       message.channel.send(onduty);
       message.member.roles.remove('826333149411409931')
    }
}
})
client.on('message', async message => {

  if (message.content == "!invites") {

    
      let invites = await message.guild.fetchInvites();

     
      const userInvites = invites.array().filter(e => e.inviter.id == message.author.id);

   
      let inviteCount = 0;

      
      userInvites.forEach(invite => inviteCount += invite.uses);
      let color = message.member.displayHexColor;
      if (color == '#36393F') color = message.member.hoistRole.hexColor
      const invites1 = new Discord.MessageEmbed()
      .setColor(color)
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`, `https://discord.com/users/${message.author.id}`)
      .setDescription(`**Έχεις \`${userInvites.length}\` ενεργά invites και  \`${inviteCount}\` ανενεργα.**`)
      message.channel.send(invites1);

  }

});
client.on('message', async message => {

  if (message.content == "!leaderboard") {

    
    const { guild } = message

    guild.fetchInvites().then((invites) => {
      const inviteCounter = {
        bob: 0,
        joe: 0,
      }

      invites.forEach((invite) => {
        const { uses, inviter } = invite
        const { username, discriminator } = inviter

        const name = `${username}`

        inviteCounter[name] = (inviteCounter[name] || 0) + uses
      })

      let replyText = 'Invites:'

      const sortedInvites = Object.keys(inviteCounter).sort(
        (a, b) => inviteCounter[b] - inviteCounter[a]
      )

      console.log(sortedInvites)

      sortedInvites.length = 3

      for (const invite of sortedInvites) {
       const count = inviteCounter[invite]
       const invites1 = new Discord.MessageEmbed()
       .setDescription(`${invite} \`${count}\``)
       .setColor('#36393F')
      message.channel.send(invites1)
    //    replyText += `\n${invite} has invited ${count} member(s)!`
      }
     
    })
}

});
command(client, 'support', message => {
  message.channel.send(`**<@&826333149411409931>  ο/η  ${message.author} χρειάζετε βοήθεια εξυπηρετήστε τον/την το συντομότερο δυνατό!**`)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.channelID;
  if (newUserChannel === "821450581956362282")
  {
    const supportlogs = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`**O <@${newMember.id}> μπήκε στο** \`📞Waiting For Support\`**!**`)   
    .setTimestamp()
      client.channels.cache.get("828548061445357619").send("<@&826333149411409931> ", supportlogs)
  }

});
command(client, 'donates', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription('```Dexter Donate Information```')
  .addField('\u200B', '** Όταν κάνετε ένα donate μας βοηθάτε να κρατάμε τον server ανοιχτό και να μπορούμε συνεχώς να τον αναβαθμίζουμε, σε καμία περίπτωση όμως ένας donator δεν θα έχει διαφορετική αντιμετώπιση από κάποιον που δεν έχει κάνει donate. Το donate στα Ελληνικά σημαίνει δωρεά και δεν είναι κάτι που σας αναγκάζουμε να κάνετε για να παίξετε στον server, για να παίξεις στον server δεν χρειάζεται να κάνετε donate. Εάν κάνεις κάποιο donate δεν θα υπάρξει για ευνόητους λόγους περίπτωση αντικατάστασης του πακέτου! Όλα τα donates θα παραμείνουν στον server μέχρι το wipe, δεν έχετε την δυνατότητα να τα πάρετε πίσω μετά το wipe ή άμα τιμωρηθείτε με ban. Τα donates δεν επιστρέφονται σε καμία περίπτωση όπως και επίσης δεν μπορόυν να δοθούν από κάποιον donator σε κάποιον παίκτη είτε με in game λεφτά είτε με κανονικά λεφτά. Τέλος, όποιο job δεν είναι ενεργό θα κατάσχετε. Για να κάνετε κάποιο donate θα πρέπει να μιλήσετε με κάποιον που έχει το role <@&821450377181397052> ή  <@&828603887476932639> .**')
  .addField('\u200B', '```Μέθοδοι πληρωμής.```')
  .addField('\u200B', '**Για να κάνετε κάποιο donate θα πρέπει να μπείτε στο κανάλι ονομαζόμενο ως 💸 Waiting For Donate όπου θα πρέπει να περιμένετε μέχρι να μπεί κάποιος μπορείτε να γράψετε τυχόν ερωτήσεις στο <#823102611104333854>. Τέλος, τα donates δίνονται απο 1 έως και 48 ώρες. Εαν κάνετε κάποιο donate σημαίνει οτι συμφωνείτε με τους όρους και τις προυποθέσεις του Server! **')

 
  message.channel.send(embed)
})
command(client, 'donates', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#945b05')
  .setDescription(`<@&821450401848098826> \`10€\`

  > **1 Donator car**

  `)
 

 
  message.channel.send(embed)
})
command(client, 'donates', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#9eaba7')
  .setDescription(`<@&821450400712491039> \`20€\`

  > **2 Donator car**

  > **20 Repair kits**

  `)
 

 
  message.channel.send(embed)
})
command(client, 'donates', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#f5ff00')
  .setDescription(`<@&821450400037077002> \`35€\`

  > **3 Donator car**

  > **35 Repair kits**

  > **1 Σπίτι**

  > **1 Βάρκα**

  `)
 

 
  message.channel.send(embed)
})
command(client, 'donates', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#0068f1')
  .setDescription(`<@&821450391438360577> \`50€\`

  > **5 Donator car**

  > **1 Ελικόπτερο**

  > **50 Repair Kits**

  > **1 Σπίτι**

  `)
 

 
  message.channel.send(embed)
})
command(client, 'donates', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#4aff00')
  .setDescription(`<@&821450398811291718> \`90€\`

  > **1 Μοναδική Mafia/Gang**

  > **1 Μοναδικo Αμάξι**

  > **1 Βάρκα ή Ελικόπτερο**

  > **15 Vests**

  > **50 Repair Kits**

  `)
 

 
  message.channel.send(embed)
})
command(client, 'donates', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription(`<@&821450390481666109> \`100€\`

  > **1 Μοναδικό Job της επιλογής σας**

  > **1 Μοναδικo Αμάξι**

  > **1 Βάρκα ή Ελικόπτερο**

  > **15 Vests**

  > **50 Repair Kits**

  `)
 

 
  message.channel.send(embed)
})
command(client, 'donates', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription("```Extra Donations```"
  +
  `
   > **1 Μοναδική πινακίδα στα αμάξια σας \`5€\`**

   > **1 Βάρκα \`5€\`**

   > **1 Μήνα Bronze Priority \`10€\`**

   > **1 Ελικόπτερο \`10€\`**

   > **1 Μήνα Silver Priority  \`15€\`**

   > **  1 Μήνα Gold Priority  \`20€\`**

   > **  1 Μοναδικό Αμάξι  \`20€\`**

   > **  1 Μοναδικό Όπλο  \`30€\`**
  `)
  

 
  message.channel.send(embed)
})
command(client, 'donates', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription("```Extra Packs```")
 
  

 
  message.channel.send(embed)
})
command(client, 'donates', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription(`<@&828602597505368074> \`25€\`

  > **1 μοναδικό job "Πετρελαιοπηγή" το οποίο το τοποθετείτε οπουδήποτε στο χάρτη και ανά μία ώρα δίνει ένα προκαθορισμένο ποσό ενώ ταυτόχρονα είναι αποκλειστικά δικό σας.**

 

  `)
 

 
  message.channel.send(embed)
})
command(client, 'donates', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#c4ff00')
  .setDescription(`<@&828602943271206942> \`100€\`

  > **1 επιχείρηση η οποία θα παράγει άλλα και θα επεξεργάζεται όποιο προϊόν θέλετε το οποίο θα τρώγεται/πίνεται ανάλογα με την επιχείρηση. Τέλος, μπορείτε να πουλάτε το προϊόν εώς μοναδικό σε μαγαζία άλλα και supermarkets.**

 

  `)
 

 
  message.channel.send(embed)
})
command(client, 'donate', message => {
  message.channel.send(`**<@&828603887476932639> ο/η  ${message.author} θέλει να κάνει donate εξυπηρετήστε τον/την το συντομότερο δυνατό!**`)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.channelID;
  if (newUserChannel === "828548994636578866")
  {
    const supportlogs = new Discord.MessageEmbed()
    .setDescription(`**O <@${newMember.id}> μπήκε στο** \`💸 Waiting For Donate\`**!**`)   
    .setColor('#8dff68')
    .setTimestamp()
      client.channels.cache.get("828548904786198528").send("<@&828603887476932639>", supportlogs)
  }
});
client.on("message", async message =>{
  if (message.author.bot) return;
  if (message.channel.id === '828551883593089024'){
       message.delete();
         const exampleEmbed = new Discord.MessageEmbed()
         .setDescription("```Poll```"
         +
         `
       **  ${message.content} **
         `)
         .setColor('#ff0000')
         .setImage('https://cdn.discordapp.com/attachments/819249210267664394/821269424501030912/Dexter_Roleplay.gif')
         .setThumbnail('https://cdn.discordapp.com/attachments/819249210267664394/821171515756249158/dexter.gif')
          
         message.channel.send("@everyone", exampleEmbed);
        
           
  }
})
command(client, 'generalrules', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription('```General Rules```')
  .setThumbnail('https://cdn.discordapp.com/attachments/819249210267664394/821171515756249158/dexter.gif')
  .addField('\u200B', '** `|1|` Απαγορεύεται αυστηρώς το "Powergaming", το [combat log], το "BM", το "RDM" [random death match] το "VDM" [vehicle death match] το METAGAME και το baiting. Επιβάλλετε το "NLR" και το Value Of Life.  **')
  .addField('\u200B', '**`|2|` Το ανούσιο role play πχ ψηλά τα χεριά σε κλέβω, όπως και τα άσκοπα kills με ασύμαντη αφορμή, θα ακυρώνουν αυτόματα το σκηνικό.**')
  .addField('\u200B', '**`|3|` Απαγορεύεται αυστηρά να φορέσετε τον ρουχισμό των staff δηλαδή το αλεξίσφαιρο τους (vest). **')
  .addField('\u200B', '**`|4|` Απαγορεύεται να πουλήσετε ή να μεταβιβάσετε με οποιονδήποτε τρόπο κάποιο donate-mafia car/ cartel-mafia-gang / donate house / donate job.**')
  .addField('\u200B', '**`|5|` Απαγορεύονται οι βρισιές σε σημείο που θα θίξετε την οικογένεια του άλλου ή τα θεία. Ο σεβασμός είναι το πρώτο και κύριο μέλημά μας, μέσα στην Πόλη.**')
  .addField('\u200B', '**`|6|` Απαγορεύεται το roleplay βιασμού κάθε είδους, καθώς επίσης και οι σεξιστικές και σεξουαλικές αναφορές και πράξεις που θίγουν άλλους χρήστες εντός ή εκτός gameplay.  **')
  .addField('\u200B', '**`|7|`  Αν σημαδεύεσαι άμεσα (πχ πιστόλι στο κεφάλι) εσύ η κάποιος δικός σου οφείλεις να κάνεις VOL.  **')
  .addField('\u200B', '**`|8|` Απαγορεύονται αυστηρά τα κράνη εκτός από την ομάδα D.O.A. της αστυνομίας.**')
  .addField('\u200B', '**`|9|` Απαγορεύεται η χρήση ελικοπτέρου μέσα στην πόλη αν δεν ειναι στο ύψος της Maze Bank και ποιο πάνω.**')
  .addField('\u200B', '**`|10|`  Τα gta peds επιτρέποντες μόνο για civilian rp μετά από έγκριση.**')
  .addField('\u200B', '**`|11|` Δεν επιτρέπετε το επιθετικό RP που σκοπό έχει να προκαλέσει.**')
  .addField('\u200B', '**`|12|` Από την στιγμή που κάποιο Staff έχει βγάλει μία απόφαση για το σκηνικό, απαγορεύεται να μπεις στο support να συζητήσεις το περιστατικό που έλυσε το staff ζητώντας ανώτερο.  **')
 
  message.channel.send(embed)
})
command(client, 'policerules', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription('```Police Rules```')
  .setThumbnail('https://cdn.discordapp.com/attachments/819249210267664394/821171515756249158/dexter.gif')
  .addField('\u200B', '** `|1|` Απαγορεύεται να δώσετε αστυνομικό εξοπλισμό σε παίκτες που δεν ανήκουν στην αστυνομία και όταν είστε off-duty πρέπει να επιστρέψετε τον εξοπλισμό σας στο αστυνομικό τμήμα.  **')
  .addField('\u200B', '**`|2|` Η αστυνομία δεν βαράει πρώτη.**')
  .addField('\u200B', '**`|3|` Για να κάνετε κάποιο open up σε σε Μαφία-Cartel-Gang-Επιχείρηση θα πρέπει να έχετε ένταλμα από κάποιον εισαγγελέα ή υψηλόβαθμο αστυνομικό. Επιτρέπεται 1 Φορα τον μηνα ανά περίπτωση με ΜΑΧ 20 αστυνομικούς. **')
  .addField('\u200B', '**`|4|` Επιτρέπεται μέχρι 6 πεσίματα τη μέρα σε χωράφια/ process με ΜΑΧ 20 άτομα.**')
  .addField('\u200B', '**`|5|` Η καταδίωξη της αστυνομίας σε μια ληστεία ξεκινά μόνο αν ο όμηρος βρίσκετε στο όχημα του διαπραγματευτή ασφαλής.**')
  .addField('\u200B', '**`|6|` Η αστυνομία δε μπορεί να σκάσει λάστιχα. Εξαιρείται η περίπτωση κατα τη διάρκεια καταδίωξης. Εκεί μόνο με taser.  **')
  .addField('\u200B', '**`|7|` Μεταγωγή θα γίνετε μονο με μεταγωγικό στης φυλακές (ισόβια = delete character).  **')
  .addField('\u200B', '**`|8|` Η Αστυνομία απαγορεύεται να κάνει σωματικό έλεγχο σε traffic stop αν δεν υπάρχουν στοιχεία criminal (fullface/οπλοθηκη/τσάντα βάρη οπλισμού/καταδίωξη).τα Ο.Π.Κ.Ε επιτρέπεται να κάνουν σωματικό έλεγχο για οποιοδήποτε λόγο έκτος πόλης.**')
  .addField('\u200B', '**`|9|` Η αστυνομία έχει τη δυνατότητα να κάνει δεκτά τα 2 από τα 3 αιτήματα στο Paleto και 3 αιτηματα δεκτα στην κεντρικη .Πλεον δεν ειναι υποχρεωμένη η Αστυνομια να τα τηρήσει ολα, μπορει και να μπλοφαρει,επισης τα παραλογα αιτηματα θα αποριπτονται.**')
  .addField('\u200B', '**`|10|`  Απαγορεύεται να κόψεις ίδιο πρόστιμο 2 φορές στον ίδιο παίκτη την ίδια στιγμή, όπως και απαγορεύεται να κόψεις πάνω από 5 πρόστιμα σε ένα σκηνικό, για παράδειγμά διπλή δολοφονία.**')
  .addField('\u200B', '**`|11|` Απαγορεύονται οι διεφθαρμένοι αστυνομικοί.**')
  
 
  message.channel.send(embed)
})
command(client, 'ekabrules', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription('```Ε.Κ.Α.Β Rules```')
  .setThumbnail('https://cdn.discordapp.com/attachments/819249210267664394/821171515756249158/dexter.gif')
  .addField('\u200B', '** `|1|`  Όλοι οι υπάλληλοι του Ε.Κ.Α.Β. θα πρέπει: α) να πηγαίνουν στις κλήσεις μόνο με τα υπηρεσιακά τους οχήματα και τα υπηρεσιακά τους ρούχα β) να βγουν off-duty μόνο σε περίπτωση που έχει λιγότερο από 3 ΕΚΑΒίτες και γ) να ειναι συνδεδεμένεοι στον υπηρεσιακό ασυρματο.  **')
  .addField('\u200B', '**`|2|`  Όσο είστε on-duty απαγορεύεται να παίζετε criminal και θα πρέπει αυστηρός να παραμένετε civilian. Όταν πάτε off duty θα πρέπει να αλλάζετε τον ρουχισμό σας και να αποθηκεύεται το υπηρεσιακό σας όχημα στο garage του Ε.Κ.Α.Β.**')
  .addField('\u200B', "**`|3|` Απαγορεύεται αυστηρά να σηκώσετε ένα τραυματία στις περιπτώσεις που: α) έχει 0 ως 5 παλμούς ή με '0% ως 20% αίμα', β) αν έχει πεθάνει απο έκρηξη, γ) αν έχει πέσει από υψόμετρο. **")
  .addField('\u200B', '**`|4|` Από 6-15 Παλμούς (BPM, Pulse) ο τραυματίας είναι υποχρεωμένος να μεταβεί/μεταφερθεί στο νοσοκομείο (είτε για χειρουργείο, είτε για εξετάσεις). Ομοίως και αν τον μεταφέρουν αναίσθητο στο νοσοκομείο (υποχρεωτικά πρέπει να γίνουν εξετάσεις και χειρουργείο).**')
  .addField('\u200B', '**`|5|` Απαγορεύεται να πουλήσει ΕΚΑΒιτης γάζες.**')
  .addField('\u200B', '**`|6|` Απαγορεύονται οι διεφθαρμένοι εκαβίτες.  **')

  
 
  message.channel.send(embed)
})
command(client, 'criminalrules', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription("```Criminal Rules```"
  +
  `
  **\`|1|\` Οι μικροκλοπές/φέρμες μέσα στην πόλη απαγορεύονται τις πρωϊνές ώρες (08:00-20:00). Εκτός πόλης επιτρέπονται βάση των υπόλοιπων κανόνων.**

  **\`|2|\` Απαγορεύεται οποιαδήποτε εγκληματική ενέργεια σε βάρος πολίτη μέσα στην πόλη, χωρίς την παρουσία 2 αστυνομικών και 1 Ε.Κ.Α.Β. (ομηρία, ληστεία, δολοφονία). Δεν επιτρέπετε το επιθετικό RP που σκοπό έχει να προκαλέσει.**
 
  **\`|3|\` Απαγορεύεται να αρχίσει κάποια φασαρία ή παράνομη δραστηριότητα (κλοπή, απαγωγή, προσταστασία, κάψιμο, δολοφονία) μέσα στα μαγαζιά, το Ε.Κ.Α.Β., το αστυνομικό τμήμα και τα γκαράζ με επιθετικό RP.**

  **\`|4|\` Η προστασία θα πρέπει να γίνει μέσω κατάλληλου RP με τον ιδιοκτήτη του καταστήματος. Η παροχή προστασίας θα πρέπει να διευθετηθεί εκτός του μαγαζιού με τους criminal που το διεκδικούν με μέγιστο ποσό προστασίας 45.000$ την εβδομάδα. Αν ένα μαγαζί αρνηθεί να συνεργαστεί, μία φορά τον μήνα μπορείς να απειλήσεις να το κάψεις. Προϋποθέτει μήνυμα στο <#828567657842343967> στη μαφία που το προστατεύει ή στον ιδιοκτήτη του καταστήματος, θα πρέπει να απαντηθεί και να γίνει defense διαφορετικά δεν υπάρχει κάψιμο (κάψιμο καταστήματος = 5 μέρες κλειστό).**
  
  **\`|5|\` Όταν πας να κλέψεις ή να απαγάγεις κάποιον και αυτός είναι συνεργάσιμος απαγορεύεται να τον σκοτώσεις.**

  **\`|6|\` Για οποιοδήποτε σενάριο απαγωγής, κλοπής ή δολοφονίας πρέπει να εξελιχθεί RP.**

  **\`|7|\` Απαγορεύεται να κάνεις απαγωγή κάποιον αστυνομικό η Ε.Κ.Α.Β. χωρίς να έχει 6 αστυνομικούς και 5 Ε.Κ.Α.Β. on-duty.**

  **\`|8|\` Για να πάρεις όμηρο πολίτη πρέπει να υπάρχει στοιχειώδες RP που να το δικαιολογεί. Για τον criminal πρέπει να έχεις στοιχεία για την ταυτότα του και να τον έχεις κάνει παρακολούθηση.**
  `)
  .setThumbnail('https://cdn.discordapp.com/attachments/819249210267664394/821171515756249158/dexter.gif')
  

  
 
  message.channel.send(embed)
})
command(client, 'criminalrules', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription(""
  +
  `
  **\`|9|\` Σε κάποιο σενάριο ομηρίας το μέγιστο χρηματικό ποσό είναι:**

  > **Πολίτης: 4.000$**
 
 > **Διοικητής Αστυνομίας/Διευθυντής Ε.Κ.Α.Β: 25.000$**

 > **Δημάρχου: 35.000$**

  **\`|10|\` Απαγορεύεται αυστηρά η κλοπή αστυνομικού οχήματος και οχήματος του ΕΚΑΒ, εκτός εάν έχει προηγηθεί κάποιο σκηνικό.**
  
  **\`11|\` Απαγορεύεται αυστηρά η κλοπή αστυνομικού οπλισμού και του εξοπλισμού του ΕΚΑΒ (φάρμακα-γάζες).**

  **\`|12|\` Κατά την διάρκεια της σύλληψης και στα κρατητήρια, θα πρέπει εφόσον ζητηθεί από τον Αστυνομικό να σηκώσεις τα χέρια σου, είσαι αναγκασμένος να το κάνεις ειδάλλως θα θεωρηθεί άρνηση rp και θα τιμωρείται.**

  **\`|13|\`  Όταν ένας παίκτης έχει τραυματιστεί μετά από σκηνικό ή του έχουν περαστεί χειροπέδες θεωρείται πως είναι υπό κράτηση. Μετά την μεταγωγή του στο τμήμα το σενάριο τελειώνει και αλλάζει σε σενάριο σύλληψης & διερεύνησης. Κατά αυτό το σενάριο οι φίλοι των ατόμων όπου είναι υπό κράτηση δεν έχουν πλέον λόγο να επεμβαίνουν, όπως και οι υπόλοιποι πολίτες δεν χρειάζεται να μείνουν εκεί είτε για να ερωτηθούν είτε για να εμπλακούν στην υπόθεση όποτε πρέπει να φύγουν από την περιοχή. ΑΠΟ ΤΗΝ ΣΤΓΜΗ ΠΟΥ ΘΑ ΒΓΕΙ ΑΠΟΦΑΣΗ ΓΙΑ ΤΟΝ ΥΠΟΠΤΟ ΓΙΑ ΤΗΝ ΜΕΤΑΦΟΡΑ ΤΟΥ ΣΤΙΣ ΦΥΛΑΚΕΣ ΤΟΤΕ ΜΠΟΡΟΥΝ ΟΙ ΔΙΚΟΙ ΤΟΥ ΝΑ ΔΡΑΣΟΥΝ ΕΠΕΙΤΑ ΑΠΟ ΤΟ ΣΧΕΤΙΚΟ TWEET ΤΗΣ ΑΣΤΥΝΟΜΙΑΣ.**

  **\`|14|\` Μεταγωγή: Επιτρέπετε να χτυπηθεί η μεταγωγή με ΜΑΧ 16 άτομα (8 + 8), με την συμμαχία σου.**

  **\`|15|\` Απαγορεύεται να βγεις από το κελί, όπως και το να αποδράσεις από το αστυνομικό τμήμα.**

  **\`|16|\` Απαγορεύεται σε traffic stop να πυροβολήσεις αστυνομικό. Στην περίπτωση που θέλεις να αποφύγεις τον έλεγχο πρέπει να ακολουθήσει καταδίωξη.**

  **\`|17|\` Το όριο ατόμων για οποιοδήποτε σκηνικό είναι αυστηρώς τα 12 άτομα.**


  `)

  

  
 
  message.channel.send(embed)
})
command(client, 'robberyrules', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription("```Robbery Rules```"
  +
  `
  **\`|1|\` Για να ξεκινήσει μία ληστεία σε κάποιο store πρέπει να υπάρχουν 3 αστυνομικοί on-duty, για να ξεκινήσει μια ληστεία σε κάποιο bank πρέπει να υπάρχουν 4 αστυνομικοί on-duty και 1+ Ε.Κ.Α.Β.**

  **\`|2|\` Απαγορεύεται να φύγετε από κάποια ληστεία ή ομηρία εάν δεν έρθει η αστυνομία σε 15 λεπτά ή αν δεν υπαρξει τέλος διαπραγμάτευσης.**
  
  **\`3|\` Για να πραγματοποιηθεί κάποια ληστεία σε κατάστημα θα πρέπει να τηρούνται τα παρακάτω όρια ατόμων:**

  > **'Shops' Από 1 έως 2 ληστές.**

  > **'Bank Paleto' 3 ληστές.**

  > **'Κεντρική bank' Από 5 έως 7 ληστές.**

  **\`|4|\` Οι αστυνομικοί σε οποιοδήποτε σκηνικό ληστείας ή ομηρίας πρέπει να είναι ίσοι με τους ληστές +1, εάν σε κάποια ληστεία δεν υπάρχει όμηρος τότε οι αστυνόμοι με τους ληστές πρέπει να είναι ίσοι.**

  **\`|5|\`  Ο διαπραγματευτής θα παρευρίσκεται πάντοτε στην ληστεία με δικό του όχημα και χωρίς να κατέχει πάνω του οπλισμό και απαγορεύεται να ακολουθήσει στην καταδίωξη, είναι μόνο και μόνο για την διασφάλιση των ομήρων και δεν θα μετράει στον αριθμό των Αστυνομικών. Για παράδειγμα, αμα οι ληστές είναι 4 και έχουν όμηρο, οι Αστυνομικοί θα είναι 6, 5 Αστυνομικοί και 1 ο διαπραγματευτής.**

  **\`|6|\` Από τη στιγμή που ξεκινήσει η καταδίωξη με την αστυνομία, πρέπει να περάσουν 15 λεπτά για να μπορέσετε να κάνετε τα παρακάτω:**

> **Να αλλάξετε το ρουχισμό.**

> **Να αλλάξετε όχημα.**

> **Να μπείτε σε κάποιο 'Property'.**

  **\`|7|\` Απαγορεύεται να εξελίσσεται ταυτόχρονα πάνω από μία ληστεία ή ομηρία.**

  **\`|8|\` Κάθε criminal έχει cooldown 1 ώρα σε κάθε ληστεία ή ομηρία.**

  **\`|9|\` Είστε υποχρεωμένοι να αναφέρετε στον διαπραγματευτή πόσα άτομα εμπλέκονται στο σκηνικό εσωτερικος η εξωτερικος.**

  **\`|10|\` Απαγορεύεται να αρχίσει απαγωγή και ληστεία σε Τράπεζα, Μαγαζάκι, 30 λεπτά πριν από restart.**

  **\`|11|\` Απαγορεύετε το counter οποιασδήποτε ληστείας-ομηρίας.**

  **\`|12|\` Απαγορεύετε να φοράτε κράνος της αστυνομίας.**


  `)
  .setThumbnail('https://cdn.discordapp.com/attachments/819249210267664394/821171515756249158/dexter.gif')
  

  
 
  message.channel.send(embed)
})
command(client, 'zonesrules', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription("```Zones Rules```"
  +
  `
  **Green Zones**

 > **\`|1|\` Στο Αστυνομικό τμήμα.**
 
 > **\`|2|\` Στο Ε.Κ.Α.Β.**

 > **\`|3|\` Στην Κεντρική Πλατεία.**
  
 > **\`|4|\` Κεντρικό Garage.**

 **Passive Zones**

 > **\`|1|\` Συνεργεία**

 > **\`|2|\` Φαγάδικα/Καφετέριες/Κλάμπς**

 **Red Zones**

 > **Ολα τα PROCESS και FIELDS**
  `)
  .setThumbnail('https://cdn.discordapp.com/attachments/819249210267664394/821171515756249158/dexter.gif')
  

  
 
  message.channel.send(embed)
})
command(client, 'mafiarules', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription("```Mafia Gangs Rules```"
  +
  `
  **\`|1|\` Θα πρέπει να έχετε έναν συγκεκριμένο ρουχισμό και συγκεκριμένα οχήματα.**
 
  **\`|2|\` Κάθε mafia ή gang επιτρέπεται να έχει στο job μέχρι 30 άτομα.**

  **\`|3|\` Απαγορεύεται σε κάποιο σκηνικό να βγάλετε πάνω από 1 ελικόπτερο ενώ υπερασπίζεστε την mafia ή το gang σας.**
  
  **\`|4|\` Σε κάποιο σενάριο ομηρίας το μέγιστο χρηματικό ποσό (Dirty Money) είναι: Mafia/Gang: $10.000 Αρχηγός Μαφίας: $35.000.**

  **\`|5|\`  Τα mafia και τα gang house δεν είναι red zone αλλά δεν μπορείτε να μπείτε μέσα σε αυτά χωρίς να σας καλέσουν, άμα εισέλθετε σε αυτά χωρίς κάποια πρόσκληση τότε μπορούν να σας πάρουν απαγωγή ή να σας σκοτώσουν και ας μην υπάρχει Ε.Κ.Α.Β. ή αστυνομία on-duty.**

  **\`|6|\` Απαγορεύεται τα Gangs να χρησιμοποιούν βαρύ οπλισμό τύπOu Assault Rifle.**

  **\`|7|\` Με την αποχώρηση από κάποιο cartel/mafia/gang απαγορεύεται να χρησιμοποιήσετε info που πήρατε από αυτό γιατί αλλιώς θα θεωρηθεί metagaming. Είναι υποχρεωτικό το "/delchar".**

  **\`|8|\` Αν μια φιλική συνάντηση εξελίχθη σε επιθετικό roleplay τότε παύει να είναι φιλική.**


  `)
  .setThumbnail('https://cdn.discordapp.com/attachments/819249210267664394/821171515756249158/dexter.gif')
  

  
 
  message.channel.send(embed)
})
command(client, 'discordrules', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription("```Discord Rules```"
  +
  `
  **\`|1|\` Σεβασμός Σε όλα τα μέλη του Server μας.**
 
  **\`|2|\` Απαγορεύονται οι βρισιές και το περιεχόμενο που μπορεί να προσβάλει κάποιον χρήστη.**

  **\`|3|\` Απαγορεύεται κάθε είδος Spam.**
  
  **\`|4|\` Απαγορεύονται κάθε είδους ρατσιστικά σχόλια.**

  **\`|5|\`  Αποφεύγεται συζητήσεις σχετικά με θρησκευτικά/Πολιτικά/Οπαδικά θέματα οτιδήποτε μπορεί να προσβάλει κάποιον.**

  **\`|6|\` Απαγορεύεται η διαφήμιση (advertise) άλλων server στο community μας.**

  **\`|7|\` Μην ειρωνεύεστε κανέναν.**

  **\`|8|\` Να είστε φιλικοί με όλους και να τους βοηθάτε όπου χρειάζεται.**

  **\`|9|\` Το Caps Lock απαγορεύεται.**


  `)
  .setThumbnail('https://cdn.discordapp.com/attachments/819249210267664394/821171515756249158/dexter.gif')
  

  
 
  message.channel.send(embed)
})
command(client, 'streamrules', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription("```Streamer Rules```"
  +
  `
  **\`|1|\` Το livestream δεν σας δίνει κανένα προβάδισμα σε σχέση με τους υπόλοιπους παίκτες, τα staff θα σας αντιμετωπίζουν ακριβώς το ίδιο σε κάθε περίπτωση.**
 
  **\`|2|\` Απαγορεύεται να βρίσετε κάποιο staff ή να δυσφημήσετε τον server.**

  **\`|3|\` Ο Streamer σε περίπτωση που σε ένα σκηνικό γίνει REPORT,αυστηρά οφείλει να βάλει MUTE το game στο stream του,σε αυτό συμπεριλαμβάνεται και το Waiting for Support.**
  
  **\`|4|\` Απαγορευεται αυστηρα η αναφορα ρατσιστικου σχολιου η hate comments προς αλλους users οπως και η κατηγορια περι streamsnipe,γι αυτο λογο υπαρχουν τα staff θα πρεπει να γινει report αν υπαρχει τετοιος ενδιασμος.**

  **\`|5|\`  Απαγορευεται αυστηρα το RolePlay το οποιο δεν αντιπροσωπευει τον Server μας οπως και το σεξιστικου και σεξουαλικου περιεχομενου.**



  `)
  .setThumbnail('https://cdn.discordapp.com/attachments/819249210267664394/821171515756249158/dexter.gif')
  

  
 
  message.channel.send(embed)
})
command(client, 'warns', (message) => {

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setDescription('```Warnings```')
  .setThumbnail('https://cdn.discordapp.com/attachments/819249210267664394/821171515756249158/dexter.gif')
  .addField('\u200B', '** Πρώτο Warning  **')
  .addField('\u200B', '```Προειδοποίηση.```')
  .addField('\u200B', "**Δεύτερο Warning **")
  .addField('\u200B', '```30 Λεπτά Jail.```')
  .addField('\u200B', '**Τρίτο Warning**')
  .addField('\u200B', '```2 μέρες BAN```')
  .addField('\u200B', '**Τέταρτο Warning**')
  .addField('\u200B', '```PERMANTLY BAN```')
  .setFooter('Κάθε Μήνα θα σας αφαιρείτε 1 warning άν έχετε.')

  
 
  message.channel.send(embed)
})
command(client, 'app',  (message) => {

  const embed = new Discord.MessageEmbed()
  .setDescription(`**[<@&821450388317536316>](https://docs.google.com/forms/d/1ejD8WeBxarG7a5o9MQg_xrKFoleKpKyosE6Tp0D2_IY/edit)**`)
.setColor('#0a0a0a')

  message.channel.send(embed)
})
command(client, 'app',  (message) => {

  const embed = new Discord.MessageEmbed()
  .setDescription(`**[<@&821450421364850769>](https://docs.google.com/forms/d/1j5n-wEakqv4L5AQeAQgMusXtD4yRWQGkrSwue-yLTIw/edit)**`)
.setColor('#0098ff')

  message.channel.send(embed)
})
command(client, 'app',  (message) => {

  const embed = new Discord.MessageEmbed()
  .setDescription(`**[<@&821450436548493343>](https://docs.google.com/forms/d/1hhOnOUddWWSyeHoccylHsjK3bU8FbFvQy3u6pZGuD-o/viewform?edit_requested=true)**`)
.setColor('#04dd53')

  message.channel.send(embed)
})
client.on('message',  message => {
  if(message.channel.id === '821450606920073336'){
  message.react("806515540725071942")
    }
});
client.on('message',  message => {
  if(message.channel.id === '821450606920073336'){
  message.react("805894023574454363")
    }
});
client.on("message", async message =>{
  if (message.author.bot) return;
  if (message.channel.id === '828567438634778644'){
          message.delete();
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`, `https://discord.com/users/${message.author.id}`)
          .setColor('#1da1f2')
          .setDescription(message.content)
          .setFooter('Twitter', 'https://cdn.discordapp.com/attachments/771448218537951285/772897362401427456/logo_1.png');
          
          
        message.channel.send(exampleEmbed);
  }
})
client.on("message", async function(message) {
  if (message.channel.id === `828567542292545536`) {
    if (message.author.bot) return;
    if (!message.attachments.first()) {
      let instagramEmbed = new Discord.MessageEmbed()
        .setColor('#d32256')
        .setDescription("" + message.content + "")
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`, `https://discord.com/users/${message.author.id}`)
    
        .setFooter('Instagram', 'https://cdn.discordapp.com/attachments/771448218537951285/787649632352075796/1200px-Instagram_logo_2016.svg_1.webp');
      message.channel.send(instagramEmbed)
      message.delete();
      return;
    }

    let img = message.attachments.first();
    let text = request.post(`https://api.imgbb.com/1/upload?key=${config.imgbb_com.imgbb_api_key_upload}`, { form: { image: img.url } }, function(error, resp, body) {
      try {
        JSON.parse(body).data.url
      } catch {
        return;
      }

      let url = JSON.parse(body).data.url;

      if (!message.content) {
        if (message.attachments.first())
          if (message.author.bot) return;
        let instagramEmbed2 = new Discord.MessageEmbed()
          .setColor('#d32256')
          .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`, `https://discord.com/users/${message.author.id}`)
         
          .setFooter('Instagram', 'https://cdn.discordapp.com/attachments/771448218537951285/787649632352075796/1200px-Instagram_logo_2016.svg_1.webp')
          .setImage(url)
        message.channel.send(instagramEmbed2)
        message.delete();
        return;

      }
     
      if (message.content && message.attachments.first())
        if (message.author.bot) return;
      let instagramEmbed3 = new Discord.MessageEmbed()
        .setColor('#d32256')
        .setDescription("" + message.content + "")
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`, `https://discord.com/users/${message.author.id}`)
      
        .setFooter('Instagram', 'https://cdn.discordapp.com/attachments/771448218537951285/787649632352075796/1200px-Instagram_logo_2016.svg_1.webp')
        .setImage(url)
      message.channel.send(instagramEmbed3)
      message.delete();
      return;
    });
  }

})
client.on("message", async message =>{
  if (message.author.bot) return;
  if (message.channel.id === '828567602892505148'){
          message.delete();
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`, `https://discord.com/users/${message.author.id}`)
          .setColor('#ffff00')
          .setDescription(message.content)
          .setFooter('Newspaper', 'https://cdn.discordapp.com/attachments/765637357919272990/772902476331614218/newsfdsbot.png');
          
          
        message.channel.send(exampleEmbed);
  }
})
client.on('message', async message => {
  if(message.author.bot) return;

if(message.channel.id === "828567657842343967"){ 
message.channel.send(message.content, message.attachments.first())
message.delete()
}
if(message.channel.id === "828567657842343967"){ 
let channel = message.guild.channels.cache.get("828571475241336872") 
if(!message.attachments.first()){ 
  let embed = new MessageEmbed()
.setDescription(`O ${message.author} έστειλε: ${message.content}`)

channel.send(embed)
}

if(!message.content){
  let channel2 = message.guild.channels.cache.get("828571475241336872") 
  let embed2 = new MessageEmbed()
  .setDescription(`O ${message.author} έστειλε μια εικόνα:`)
  .setImage(message.attachments.first().proxyURL)
  channel2.send(embed2)
}
else if(message.content, message.attachments.first()){
  let channel3 = message.guild.channels.cache.get("828571475241336872") 
  let embed3 = new MessageEmbed()
  .setDescription(`O ${message.author} έστειλε: ${message.author}`)
 .setImage(message.attachments.first().proxyURL)
  channel3.send(embed3)
}
} 
  });
  client.on('guildMemberAdd', member => {
  member.roles.add('821458233432604723')
    
  });
  client.on('guildMemberAdd', async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        const embed = new MessageEmbed()
            .setDescription(` O ${member.user.tag} μπήκε με invite από τον: ${usedInvite.inviter.tag} \nΟ ${usedInvite.inviter.tag} έχει ${usedInvite.uses} invites. `)
            .setTimestamp()
            .setColor('#ff0000')
            .setTitle('Καλώς ήρθες στον Dexter Roleplay!');
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '828571128418533436');
        if(welcomeChannel) {
            welcomeChannel.send(embed).catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
});
client.on('message',  message => {
  if (message.content.includes('discord.gg/') || message.content.includes('discordapp.com/invite/')) { 
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.delete() 
        .then(message.member.send(message.INVITELINK))
        const logs = message.guild.channels.cache.get("828571300887920651") 
        const logs1 = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`, `https://discord.com/users/${message.author.id}`)
        .setDescription(`**O ${message.author} έστειλε invite: ${message.content}**`)
        .setColor('#ff0000')
        
        logs.send(logs1)
    }
  }
})

jointocreate(client)
jointocreate2(client)
welcome(client)
leave(client)
})
client.login(config.token)