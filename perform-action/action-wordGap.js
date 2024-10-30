import { tungguClick } from "../utils/utils.js";

async function performActionWordGap(page) {
  console.log("PERFORM ACTION WORD GAP");
  console.log("<========================>");

  await tungguClick(page, ".mcqInlineItem");
  await tungguClick(page, ".check");
  await tungguClick(page, ".reveal");

  const uniqueSelectors = await page.evaluate(() => {
    const selectableElements = document.querySelectorAll(
      ".mcqInlineItem-selected"
    );

    return Array.from(selectableElements).map((element, index) => {
      const uniqueDataAttribute = `temp-unique-id-${index}`;
      element.setAttribute("data-unique", uniqueDataAttribute);
      return `[data-unique="${uniqueDataAttribute}"]`;
    });
  });

  await tungguClick(page, ".reset");
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

export default performActionWordGap;
