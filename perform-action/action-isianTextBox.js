import { tungguClick } from "../utils/utils.js";

async function performActionIsianTextBox(page) {
  console.log("PERFORM ACTION ISIAN TEXT BOX");
  console.log("<========================>");
  await page.waitForSelector(".textEntry-textBox");
  await page.evaluate(() => {
    document.querySelectorAll(".textEntry-textBox")[0].value = "myudak";
  });

  await tungguClick(page, ".check");
  await tungguClick(page, ".reveal");

  const jawaban = await page.evaluate(() => {
    const textBoxes = document.querySelectorAll(".textEntry-textBox");
    const jawaban = [];

    textBoxes.forEach((textBox) => {
      const selectedValue = textBox.value;
      jawaban.push(selectedValue);
    });

    return jawaban;
  });

  await tungguClick(page, ".reset");
  console.log("CONSOLE OUTPUT -> JAWABANN ==>:", jawaban);

  await page.evaluate((jawaban) => {
    const textBoxes = document.querySelectorAll(".textEntry-textBox");
    for (let i = 0; i < textBoxes.length; i++) {
      textBoxes[i].value = jawaban[i];
    }
  }, jawaban);
  await tungguClick(page, ".check");
  await tungguClick(page, "#navbarRightButton");
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  await tungguClick(page, "#navbarRightButton");
  console.log("<========================>");
  console.log("<=== OPERATION DONE ===>");
}

export default performActionIsianTextBox;
