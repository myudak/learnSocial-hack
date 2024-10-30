import { tungguClick } from "../utils/utils.js";

async function performActionDropDown(page) {
  console.log("PERFORM ACTION DropDown");
  console.log("<========================>");

  await cekAdaGak(page, ".dropDownBox");

  await page.evaluate(() => {
    document.querySelector(".dropDownBox").value =
      document.querySelectorAll(".option")[1].value;
  });

  await tungguClick(page, ".check");
  await tungguClick(page, ".reveal");

  const jawaban = await page.evaluate(() => {
    const dropdowns = document.querySelectorAll(".dropDownBox");
    const jawaban = [];

    dropdowns.forEach((dropdown) => {
      const selectedValue = dropdown.value;
      jawaban.push(selectedValue);
    });

    return jawaban;
  });

  await tungguClick(page, ".reset");
  console.log("CONSOLE OUTPUT -> JAWABANN ==>:", jawaban);

  await page.evaluate((jawaban) => {
    const dropdowns = document.querySelectorAll(".dropDownBox");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].value = jawaban[i];
    }
  }, jawaban);

  await tungguClick(page, ".check");
  await tungguClick(page, "#navbarRightButton");
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  await tungguClick(page, "#navbarRightButton");
  console.log("<========================>");
  console.log("<=== OPERATION DONE ===>");
}

export default performActionDropDown;
