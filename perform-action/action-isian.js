import { cekAdaGak, tungguClick } from "../utils/utils.js";

async function performActionIsian(page) {
  console.log("PERFORM ACTION ISIAN");
  console.log("<========================>");

  await cekAdaGak(page, ".textEntry-textArea");

  await page.waitForSelector(".textEntry-textArea");
  await page.evaluate(() => {
    document.querySelectorAll(".textEntry-textArea")[0].value = "myudak";
  });

  await tungguClick(page, ".check");
  await tungguClick(page, ".reveal");

  const values = await page.evaluate(() => {
    const textAreas = document.querySelectorAll(".textEntry-textArea");
    return Array.from(textAreas).map((textArea) => textArea.value);
  });

  console.log("CONSOLE OUTPUT -> JAWABANN ==>:", values);

  await tungguClick(page, ".reset");
  await page.evaluate((values) => {
    const textAreas = document.querySelectorAll(".textEntry-textArea");
    textAreas.forEach((textArea, index) => {
      if (values[index] !== undefined) {
        textArea.value = values[index];
        textArea.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  }, values);
  await tungguClick(page, ".check");
  await tungguClick(page, "#navbarRightButton");
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  await tungguClick(page, "#navbarRightButton");
  console.log("<========================>");
  console.log("<=== OPERATION DONE ===>");
}

export default performActionIsian;
