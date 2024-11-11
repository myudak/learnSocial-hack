import puppeteer from "puppeteer";
import chalk from "chalk";

import asciiArt from "./config/asciiArt.js";
import {
  WEB_LINK,
  APP_VERSION,
  USERNAME,
  PASSWORD,
} from "./config/mainConfig.js";

import performActionIsian from "./perform-action/action-isian.js";
import performActionABCD from "./perform-action/action-pilgan.js";
import performActionDropDown from "./perform-action/action-dropdown.js";
import performActionSelectWord from "./perform-action/action-selectWord.js";
import performActionCeklis from "./perform-action/action-ceklis.js";
import performActionIsianTextBox from "./perform-action/action-isianTextBox.js";
import performActionWordGap from "./perform-action/action-wordGap.js";
import performActionDuaPart from "./perform-action/action-dua-part.js";
import performActionAll from "./perform-action/action-all.js";
import performActionResetAll from "./perform-action/action-resetAll.js";
import performActionTanyaBob from "./perform-action/action-tanyaBob.js";

import { tungguClick, exitProgram, rl, helpProgram } from "./utils/utils.js";

let history = [];
let show = true;

async function listenForInput(page, browser) {
  const commands = {
    1: () => performActionABCD(page),
    2: () => performActionIsian(page),
    3: () => performActionCeklis(page),
    4: () => performActionDropDown(page),
    5: () => performActionSelectWord(page),
    6: () => performActionIsianTextBox(page),
    7: () => performActionWordGap(page),
    8: () => performActionDuaPart(page),
    a: () => performActionAll(page),
    r: () => performActionResetAll(page),
    "?": () => helpProgram(),
    h: () => (show = !show),
    hide: () => (show = !show),
    show: () => (show = !show),
    clear: () => console.clear(),
    close: () => exitProgram(browser),
    c: () => exitProgram(browser),
    q: () => exitProgram(browser),
  };

  const menu = () =>
    chalk.magentaBright("\n==========|@myudak|==============\n") +
    [
      "1 : Soal Pilihan Ganda ABCD",
      "2 : Soal Isian TextArea",
      "3 : Soal Ceklis Ceklis",
      "4 : Soal Dropdown",
      "5 : Soal Select Word Kata",
      "6 : Soal Isian TextBox (Complete the sentences)",
      "7 : Soal Fill the gap (Choose the words that cannot fill the gaps)",
      "8 : Soal dua part kanan kiri",
      "bob : bob robot undip",
      "a : All Auto Answer in one unit ⚠️ Beta",
      "r : Reset All answer in one unit",
      "c / q / close : Exit X",
      "h / hide / show : Hide / Show this display helper",
      "clear : Clear Console Screen",
      "? : Show Help",
    ]
      .map(
        (item) =>
          chalk.green(item.slice(0, item.indexOf(":") + 2)) +
          chalk.cyan(item.slice(item.indexOf(":") + 2))
      )
      .join("\n") +
    chalk.magentaBright("\n============〜(￣▽￣〜)============\n");

  while (true) {
    const input = await new Promise((resolve) =>
      rl.question(
        show ? menu() + chalk.white("> ") : chalk.white("> "),
        resolve
      )
    );

    if (input.includes("bob")) {
      await performActionTanyaBob(history, input);
    } else if (commands[input]) {
      await commands[input]();
    } else {
      console.log("Unknown Command gblog");
    }
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(WEB_LINK);
  console.log((await page.title()) + " LearnSocial" + APP_VERSION);
  //   page.on("console", async (msg) => {
  //     const msgArgs = msg.args();
  //     for (let i = 0; i < msgArgs.length; ++i) {
  //       console.log(await msgArgs[i].jsonValue());
  //     }
  //   });

  await new Promise((resolve) => setTimeout(resolve, 3500));
  await page.waitForSelector(".gwt-TextBox");

  if (!USERNAME && !PASSWORD) {
    console.log(
      chalk.red("!!!USERNAME PASSWORD BLOM DI SET DI ENV!!! (ExiTing)...")
    );
    await exitProgram(browser);
  }
  await page.evaluate((u) => {
    document.querySelectorAll(".gwt-TextBox")[0].value = u;
  }, USERNAME);
  await page.evaluate((p) => {
    document.querySelectorAll(".gwt-TextBox")[1].value = p;
  }, PASSWORD);
  await tungguClick(page, "#loginButton");

  await tungguClick(page, "#courses");

  console.log(chalk.blue(asciiArt));
  console.log(chalk.red("created by : myudak || https://github.com/myudak"));
  console.log(chalk.yellow("💡🦖 Command :"));

  listenForInput(page, browser);
})();
