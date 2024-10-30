import readline from "readline";

async function tungguClick(p, select) {
  await p.waitForSelector(select);
  await p.click(select);
}

async function cekAdaGak(p, select) {
  try {
    await p.waitForSelector(select, { timeout: 5000 });
    console.log("ok gas");
  } catch (error) {
    console.error("gk ketemu jing:", error.message);
    return;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function exitProgram(browser) {
  await browser.close();
  rl.close();
  console.log("Oke thanks makasih muach 😘");
  console.log("~~ myudak || https://github.com/myudak || @myudakk ~~");
  process.exit(0);
}

export { tungguClick, exitProgram, rl, cekAdaGak };
