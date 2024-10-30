import { cekAdaGak, tungguClick } from "../utils/utils.js";

async function performActionCeklis(page) {
  console.log("PERFORM ACTION CEKLIS");
  console.log("<========================>");

  await cekAdaGak(page, ".mcqAlignedItem");

  await tungguClick(page, ".mcqAlignedItem");
  await tungguClick(page, ".check");
  await tungguClick(page, ".reveal");

  const ids = await page.evaluate(() => {
    const selectedItems = document.querySelectorAll(".mcqAlignedItem-selected"); // Select all matching elements
    return Array.from(selectedItems)
      .map((item) => item.id)
      .filter((id) => id);
  });

  console.log("CONSOLE OUTPUT -> ID Jawabann:", ids);
  await tungguClick(page, ".reset");
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  for (const id of ids) {
    await tungguClick(page, "#\\31 " + id.substring(1));
    console.log("CONSOLE OUTPUT -> KLIKD");

    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  await tungguClick(page, ".check");
  await tungguClick(page, "#navbarRightButton");
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  await tungguClick(page, "#navbarRightButton");
  console.log("<========================>");
  console.log("<=== OPERATION DONE ===>");
}

export default performActionCeklis;
