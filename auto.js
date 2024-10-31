// !DEPRECATED JUST FOR EXPERIMENT
const puppeteer = require("puppeteer");

// Helper function to wait for a selector and click it
async function tungguClick(p, select) {
  await p.waitForSelector(select);
  await p.click(select);
}

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false
  const page = await browser.newPage();
  await page.goto("https://undip.learnsocial.online/");
  console.log(await page.title());
  //   page.on("console", async (msg) => {
  //     const msgArgs = msg.args();
  //     for (let i = 0; i < msgArgs.length; ++i) {
  //       console.log(await msgArgs[i].jsonValue());
  //     }
  //   });

  await new Promise((resolve) => setTimeout(resolve, 3500));
  // Wait for the elements with class ".gwt-TextBox" to be available
  await page.waitForSelector(".gwt-TextBox");

  // Fill in the first input field
  await page.evaluate(() => {
    document.querySelectorAll(".gwt-TextBox")[0].value = "myudak";
  });

  // Fill in the second input field (if there is one)
  await page.evaluate(() => {
    document.querySelectorAll(".gwt-TextBox")[1].value = "muhamad1234";
  });

  await tungguClick(page, "#loginButton");
  await tungguClick(page, "#courses");
  //   CFR A1
  await tungguClick(
    page,
    "body > div.rootPanelStyle > div.screenTableStyle > div.menuTdScreenStyle > div > div > div.mainMenuStyle > div > table > tbody:nth-child(2) > tr:nth-child(19) > td > div.productsMenuItemStyle.clickableItem"
  );

  //   PENCET UNITS
  await tungguClick(
    page,
    "#\\31 441721608317aUUxsyylPRfnxxT9 > table > tr > td.screenTableTitleCell"
  );
  await tungguClick(
    page,
    "#\\31 441721608362Vbm7UFsCE0fH10e3 > table > tr > td.screenTableTitleCell"
  ); // UNIT 1
  await tungguClick(
    page,
    "#\\31 4417216083939GwkiGwtlgandjfO > table > tr > td.screenTableTitleCell"
  ); // EXRCISE
  await tungguClick(
    page,
    "#\\31 441721608404Qrd5akaHZcJwkZw8 > table > tr > td.screenTableTitleCell"
  ); // 3.1

  // ===========================================

  while (1) {
    const instructionalText = await page.evaluate(() => {
      const element = document.querySelector(".instructionalText");
      return element ? element.textContent : null;
    });

    if (
      instructionalText.trim() ===
      "Choose the correct answer to complete the conversations, as shown in the example."
    ) {
      await tungguClick(page, ".mcqItemStyle");
      await tungguClick(page, ".check");
      await tungguClick(page, ".reveal");

      // Wait for all elements to load
      await page.waitForSelector(".mcqItemTraditionalWrapper");

      // Get text of all .mcqItemTraditionalWrapper elements that contain a .mcqMarkContainer div
      const textContents = await page.evaluate(() => {
        const elements = document.querySelectorAll(
          ".mcqItemTraditionalWrapper"
        );
        const texts = [];
        elements.forEach((element) => {
          if (element.querySelector(".mcqMarkContainer")) {
            texts.push(element.innerText.trim());
          }
        });
        return texts;
      });

      console.log("JAWABANN ==>:", textContents);

      await tungguClick(page, ".reset");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Iterate over the text array and click each matching div
      const divs = await page.$$("span"); // Select all divs
      for (const div of divs) {
        const textContentss = await page.evaluate((el) => el.textContent, div);
        if (textContents.includes(textContentss)) {
          await div.click();
          console.log(`Clicked div containing: ${textContentss}`);
        }
      }

      console.log("DONE KONTOL");
      await tungguClick(page, ".check");
      await tungguClick(page, "#navbarRightButton");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await tungguClick(page, "#navbarRightButton");
    }

    if (
      instructionalText.trim() ===
      "Put each sentence into the correct order, as shown in the example."
    ) {
      console.log("PUT EACHH SECTION");
      await page.waitForSelector(".textEntry-textArea");
      await page.evaluate(() => {
        document.querySelectorAll(".textEntry-textArea")[0].value = "myudak";
      });

      await tungguClick(page, ".check");
      await tungguClick(page, ".reveal");

      // Step 1: Get all the values from elements with class 'textEntry-textArea'
      const values = await page.evaluate(() => {
        const textAreas = document.querySelectorAll(".textEntry-textArea");
        return Array.from(textAreas).map((textArea) => textArea.value); // Store the values in an array
      });

      console.log("JAWABANN ==>:", values);

      // Step 2: Wait for a specified duration (e.g., 5 seconds)
      await tungguClick(page, ".reset");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 3: Fill all elements with the stored values
      await page.evaluate((values) => {
        const textAreas = document.querySelectorAll(".textEntry-textArea");
        textAreas.forEach((textArea, index) => {
          if (values[index] !== undefined) {
            // Check if there's a value to set
            textArea.value = values[index]; // Fill the text area with the stored value
            textArea.dispatchEvent(new Event("input", { bubbles: true })); // Trigger input event to notify any listeners
          }
        });
      }, values);
      console.log("DONE TOLLL");
      await tungguClick(page, ".check");
      await tungguClick(page, "#navbarRightButton");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await tungguClick(page, "#navbarRightButton");
    }

    if (
      instructionalText.trim() ===
      "Decide if the pairs of sentences have the same meaning, as shown in the example."
    ) {
      await tungguClick(page, ".mcqAlignedItem");
      await tungguClick(page, ".check");
      await tungguClick(page, ".reveal");

      // Step 1: Get all IDs of elements with class 'mcqAlignedItem-selected'
      const ids = await page.evaluate(() => {
        const selectedItems = document.querySelectorAll(
          ".mcqAlignedItem-selected"
        ); // Select all matching elements
        return Array.from(selectedItems)
          .map((item) => item.id)
          .filter((id) => id); // Extract IDs and filter out empty values
      });

      // Log the extracted IDs
      console.log("IDs of selected items:", ids);
      await tungguClick(page, ".reset");
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Step 2: Click each div with the retrieved IDs
      for (const id of ids) {
        await tungguClick(page, "#\\31 " + id.substring(1));
        console.log("KLIKD");

        // Optionally, wait for a moment after each click (if needed)
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      console.log("DONE TOLLL");
      await tungguClick(page, ".check");
      await tungguClick(page, "#navbarRightButton");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await tungguClick(page, "#navbarRightButton");
    }
  }
  // Keep the browser open for 10 seconds before closing
  console.log("<==DONEEEE===>");
  await new Promise((resolve) => setTimeout(resolve, 10000));
  await browser.close();
})();
