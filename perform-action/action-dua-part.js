import { tungguClick } from "../utils/utils.js";

async function performActionDuaPart(page) {
  console.log("PERFORM ACTION WORD GAP");
  console.log("<========================>");

  const uniqueSelectors = await page.evaluate(() => {
    const a = [];
    const elements = Array.from(document.querySelectorAll(".pendingPair"))
      .map((element) => ({
        element,
        origId: element.getAttribute("orig_id"),
      }))
      .sort((a, b) => a.origId.localeCompare(b.origId));

    elements.forEach((item, index) => {
      item.element.setAttribute("unique_id", `unique_${index + 1}`);
      a.push(`[unique_id="unique_${index + 1}"`);
    });
    return a;
  });

  console.log("JAWABANN ==>", uniqueSelectors);

  for (const selector of uniqueSelectors) {
    try {
      await page.click(selector);
      console.log(`CONSOLE OUTPUT -> Klik Selektor: ${selector}`);
    } catch (error) {
      console.error(
        `CONSOLE OUTPUT -> Could not click element with selector: ${selector}`,
        error
      );
    }
  }

  await tungguClick(page, ".check");
  await tungguClick(page, "#navbarRightButton");
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  await tungguClick(page, "#navbarRightButton");
  console.log("<========================>");
  console.log("<=== OPERATION DONE ===>");
}

export default performActionDuaPart;
