import { cekAdaGak, tungguClick } from "../utils/utils.js";

async function performActionSelectWord(page) {
  console.log("PERFORM ACTION SELECT WORD");
  console.log("<========================>");

  await cekAdaGak(page, ".wordSelect-Selectable");

  await tungguClick(page, ".wordSelect-Selectable");
  await tungguClick(page, ".check");
  await tungguClick(page, ".reveal");

  const uniqueSelectors = await page.evaluate(() => {
    const selectableElements = document.querySelectorAll(
      ".wordSelect-Selectable"
    );
    const filteredElements = Array.from(selectableElements).filter(
      (element) => {
        const nextSibling = element.nextElementSibling;
        const previousSibling = element.previousElementSibling;
        return (
          (nextSibling && nextSibling.classList.contains("markContainer")) ||
          (previousSibling &&
            previousSibling.classList.contains("markContainer"))
        );
      }
    );

    return filteredElements.map((element, index) => {
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

export default performActionSelectWord;
