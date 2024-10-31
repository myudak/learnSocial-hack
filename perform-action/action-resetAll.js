import { cekAdaGak, tungguClick } from "../utils/utils.js";

async function performActionResetAll(page) {
  while (1) {
    if (await cekAdaGak(page, ".reset")) {
      console.log("<========================>");
      console.log("CONSOLE OUTPUT -> Resetting...");
      await tungguClick(page, ".reset");
      await tungguClick(page, "#navbarRightButton");
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      await tungguClick(page, "#navbarRightButton");
      console.log("<========================>");
      console.log("<=== OPERATION DONE ===>");
    } else break;
  }
}

export default performActionResetAll;
