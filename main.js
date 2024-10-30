import puppeteer from "puppeteer";
import chalk from "chalk";
import asciiArt from "./asciiArt.js";
import performActionIsian from "./perform-action/action-isian.js";
import performActionABCD from "./perform-action/action-pilgan.js";
import performActionDropDown from "./perform-action/action-dropdown.js";
import performActionSelectWord from "./perform-action/action-selectWord.js";
import performActionCeklis from "./perform-action/action-ceklis.js";
import performActionIsianTextBox from "./perform-action/action-isianTextBox.js";
import performActionWordGap from "./perform-action/action-wordGap.js";
import { tungguClick, exitProgram, rl } from "./utils/utils.js";
import "dotenv/config";

async function listenForInput(page, browser) {
  while (1) {
    const input = await new Promise((resolve) => {
      rl.question(
        chalk.magentaBright("\n========================\n") +
          chalk.green("1 : ") +
          chalk.cyan("Soal Pilihan Ganda ABCD\n") +
          chalk.green("2 : ") +
          chalk.cyan("Soal Isian TextArea\n") +
          chalk.green("3 : ") +
          chalk.cyan("Soal Ceklis Ceklis\n") +
          chalk.green("4 : ") +
          chalk.cyan("Soal Dropdown\n") +
          chalk.green("5 : ") +
          chalk.cyan("Soal Select Word Kata\n") +
          chalk.green("6 : ") +
          chalk.cyan("Soal Isian TextBox (Complete the sentences)\n") +
          chalk.green("7 : ") +
          chalk.cyan(
            "Soal Fill the gap (Choose the words that cannot fill the gaps)\n"
          ) +
          chalk.green("c / q / close : ") +
          chalk.cyan("Exit X\n") +
          chalk.green("clear : ") +
          chalk.cyan("Clear Console Screen\n") +
          chalk.magentaBright("========================\n") +
          chalk.white("> "),
        resolve
      );
    });

    if (input === "1") {
      await performActionABCD(page);
    } else if (input === "close" || input === "c" || input === "q") {
      await exitProgram(browser);
    } else if (input === "2") {
      await performActionIsian(page);
    } else if (input === "3") {
      await performActionCeklis(page);
    } else if (input === "4") {
      await performActionDropDown(page);
    } else if (input === "5") {
      await performActionSelectWord(page);
    } else if (input === "6") {
      await performActionIsianTextBox(page);
    } else if (input === "7") {
      await performActionWordGap(page);
    } else if (input === "clear") {
      await console.clear();
    } else {
      console.log("Unknown Command gblog");
    }
  }
}

(async () => {
  const USERNAME = process.env.USERUNDIP;
  const PASSWORD = process.env.PASSWORDUNDIP;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://undip.learnsocial.online/");
  console.log((await page.title()) + " Learn Social v0.1");
  //   page.on("console", async (msg) => {
  //     const msgArgs = msg.args();
  //     for (let i = 0; i < msgArgs.length; ++i) {
  //       console.log(await msgArgs[i].jsonValue());
  //     }
  //   });

  await new Promise((resolve) => setTimeout(resolve, 3500));
  await page.waitForSelector(".gwt-TextBox");
  await page.evaluate((u) => {
    document.querySelectorAll(".gwt-TextBox")[0].value = u;
  }, USERNAME);
  await page.evaluate((p) => {
    document.querySelectorAll(".gwt-TextBox")[1].value = p;
  }, PASSWORD);
  await tungguClick(page, "#loginButton");

  await tungguClick(page, "#courses");
  await tungguClick(
    page,
    "body > div.rootPanelStyle > div.screenTableStyle > div.menuTdScreenStyle > div > div > div.mainMenuStyle > div > table > tbody:nth-child(2) > tr:nth-child(19) > td > div.productsMenuItemStyle.clickableItem"
  ); //   CFR A1
  await tungguClick(
    page,
    "#\\31 441721608317aUUxsyylPRfnxxT9 > table > tr > td.screenTableTitleCell"
  ); //   PENCET UNITS
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

  console.log(chalk.blue(asciiArt));
  console.log(chalk.red("created by : myudak || https://github.com/myudak"));
  console.log(chalk.yellow("💡🦖 Command :"));

  listenForInput(page, browser);
})();
