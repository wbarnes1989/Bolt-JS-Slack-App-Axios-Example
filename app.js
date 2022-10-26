const { App } = require('@slack/bolt');
const axios = require('axios');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('get test', async ({say}) => {
  async function getUserData(myData) {
    try {
      response = await axios.get('https://httpbin.org/get')
      myData = response.data;
      return myData;
    }
    catch(error) {
      console.log(error);
    };
  };

  (async () => {
    let myData = await getUserData();
    await say(`Get response received, here is your data: \`\`\`${JSON.stringify(myData)}\`\`\``);
  })()
});

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT || 3000));
  console.log('⚡️ Bolt app is running!');
})();