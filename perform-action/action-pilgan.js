import { cekAdaGak, tungguClick } from "../utils/utils.js";

async function performActionABCD(page) {
  console.log("PERFORM ACTION PILGAN ABCD");
  console.log("<========================>");

  if (!cekAdaGak(page, ".mcqItemStyle")) return;

  try {
    await tungguClick(page, ".mcqItemStyle");
    await tungguClick(page, ".check");
    await tungguClick(page, ".reveal");

    await page.waitForSelector(".mcqItemTraditionalWrapper");

    const textContents = await page.evaluate(() => {
      const elements = document.querySelectorAll(".mcqItemTraditionalWrapper");
      const texts = [];
      elements.forEach((element) => {
        if (element.querySelector(".mcqMarkContainer")) {
          texts.push(element.innerText.trim());
        }
      });
      return texts;
    });

    console.log("CONSOLE OUTPUT -> JAWABANN ==>:", textContents);

    await tungguClick(page, ".reset");
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const divs = await page.$$("span");
    for (const div of divs) {
      const textContentss = await page.evaluate((el) => el.textContent, div);
      if (textContents.includes(textContentss)) {
        await div.click();
        console.log(`CONSOLE OUTPUT -> Option di klik : ${textContentss}`);
      }
    }

    await tungguClick(page, ".check");
    await tungguClick(page, "#navbarRightButton");
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    await tungguClick(page, "#navbarRightButton");
    console.log("<========================>");
    console.log("<=== OPERATION DONE ===>");
  } catch (error) {
    console.error("ERROR", error);
    return;
  }
}

export default performActionABCD;
