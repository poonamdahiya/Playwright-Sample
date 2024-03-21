const { test,expect } = require('@playwright/test');
const {
  VisualGridRunner,
  ClassicRunner,
  Eyes,
  Target,
  Configuration,
  BatchInfo,
  BrowserType,
  DeviceName,
  ScreenOrientation,
  IosDeviceName,
  IosVersion,
  By,
  StitchMode
} = require('@applitools/eyes-playwright');

test.describe('NAB Chat Widget', () => {
          let eyes, runner;
          let IsVisualGridRunner= true;

    test.beforeEach(async () => {

        if(IsVisualGridRunner){
        runner = new VisualGridRunner({testConcurrency: 5});
        }
        else {
        runner = new ClassicRunner; }

        eyes = new Eyes(runner);
        const configuration = new Configuration();
        configuration.setBatch(new BatchInfo('NAB Chat Widget'));
        configuration.setVisualGridOption('firefox:stabilizationDelayPostNavigationMs','1000')
        configuration.setStitchMode(StitchMode.SCROLL);

        if(IsVisualGridRunner){
        configuration.addBrowser(1440, 900, BrowserType.CHROME);
       configuration.addBrowser(1440, 900, BrowserType.FIREFOX);
        configuration.addBrowser(1440, 900, BrowserType.EDGE_CHROMIUM);
        configuration.addBrowser(1440, 900, BrowserType.SAFARI);


//     iOS mobile rendering is not as expected - chk the results
        configuration.addBrowser({
          iosDeviceInfo: {
            deviceName: IosDeviceName.iPhone_13,
          }
        });

    }
    eyes.setConfiguration(configuration);

  });

    test('Chat Widget', async ({ page }) => {

        await page.goto('https://www.nab.com.au/help-support');
        await eyes.open(page, 'NAB Chat Widget', 'Chat Widget Validation');
        await page.waitForTimeout(10000); // waits for 2 seconds



        const FrameContainer = await page.frameLocator('iframe#web-messenger-container');
        const khChatWindowContainer2 = await FrameContainer.locator('body #web-messenger-container'); //Working

        const FabButton = await FrameContainer.locator('button#khorosWidgetButton');

        // Click Chat FAB Button
        FabButton.click();

        await page.waitForTimeout(20000);

//         const newHeight = '100vh';
//
//         var script = await page.evaluate((newHeight) => {
//           const iframe = document.getElementById('web-messenger-container');
//           if (iframe) {
//             iframe.style.height = newHeight;
//           }
//         }, newHeight);

 // Checkpoint 1 - Check the iOS mobile full page screenshot. It's stretched out with a lot of whitespace at the bottom of the page
        await eyes.check(
              'Welcome screen',
              Target.region('body #web-messenger-container')
                 .fully()
//                 .beforeRenderScreenshotHook(script)
        );

        // Selectors for User Actions
        const startChatButton = await FrameContainer.getByRole('button', {
              name: 'Start conversation',
            });

        const closeChatButton = await FrameContainer.getByRole('button', {
              name: 'Close Button',
            });
            const loadingIndicator = await FrameContainer.locator(
              '.khBusinessProfile + div span + span + span'
            );
        const chatInput = await FrameContainer.getByRole('textbox', {
              name: 'Type a message...',
            });
        const sendMessageButton = await FrameContainer.getByRole('button', {
              name: 'Send Button',
            });
        const emojiButton = await FrameContainer.getByRole('button', {
              name: 'Emoji Button',
            });
        const msgtoIgnore = await FrameContainer.getByRole('textbox', {
                  name: 'Message us 24/7',
                });

        const messageList = await FrameContainer.getByRole('list');
        const agentMessages = await messageList.locator('.khAgentMessageBubble');
        const messages = await messageList.locator('.khMessageBubbleWrapper');


        const agentTypingIndicator = await messageList.locator(
            '> div span + span + span'
          );

        // Click on start conversation
        await startChatButton.click();



        // waitForChatInit() {
        await expect(loadingIndicator).toBeHidden();
        if (await agentTypingIndicator.isVisible({ timeout: 3000 })) {
             await expect(agentTypingIndicator).toBeVisible({ timeout: 15_000 });
             await expect(agentMessages.last()).toBeInViewport({
             timeout: 10_000,
         });
            await expect(agentTypingIndicator).toBeHidden({ timeout: 15_000 });
        } else {
            await expect(agentMessages.last()).toBeInViewport({
            timeout: 10_000,
         });
        }

        await chatInput.fill("Test Chat");
        await sendMessageButton.click();
        await expect(agentTypingIndicator).toBeVisible({ timeout: 15_000 });
        await expect(agentTypingIndicator).toBeHidden({ timeout: 15_000 });
//        await messages.last().scrollIntoViewIfNeeded();

        await chatInput.fill("Test Chat Again");
        await sendMessageButton.click();
        await expect(agentTypingIndicator).toBeVisible({ timeout: 15_000 });
        await expect(agentTypingIndicator).toBeHidden({ timeout: 15_000 });
//        await messages.last().scrollIntoViewIfNeeded();

     // Define the beforeRenderScreenshotHook script
       const script1 = `
         const iframe = document.querySelector('iframe#web-messenger-container');
         const scrollArea = iframe.contentDocument.querySelector('.khScrollArea');
         iframe.style.position = 'absolute';
         iframe.style.top = '0';
         iframe.style.height = (iframe.offsetHeight + scrollArea.scrollHeight - scrollArea.offsetHeight) + 'px';
       `;

 // Checkpoint 2 - Check the iOS mobile full page screenshot. It's stretched out with a lot of whitespace at the bottom of the page
         await eyes.check(
                 'Welcome screen',
                 Target.region('iframe#web-messenger-container')
                   .fully()
                   .beforeRenderScreenshotHook(script1)
           );
        await eyes.close(false);
  });


  test.afterEach(async () => {
    await eyes.abort();
    const results = await runner.getAllTestResults(false);
    console.log('Ultrafast Results', results);
  });
});