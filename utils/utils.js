import readline from "readline";
import open from "open";

async function tungguClick(p, select) {
  await p.waitForSelector(select, { timeout: 5000 });
  await p.click(select);
}

async function selectorToNama(select) {
  const namaSelector = {
    ".mcqAlignedItem": "Soal Ceklis Ceklis",
    ".dropDownBox": "Soal Dropdown",
    ".pendingPair": "Soal Dua Part Kanan Kiri",
    ".textEntry-textArea": "Soal Isian TextArea",
    ".textEntry-textBox": "Soal Isian TextBox (Complete the sentences)",
    ".mcqInlineItem":
      "Soal Fill the gap (Choose the words that cannot fill the gaps)",
    ".mcqItemStyle": "Soal Pilihan Ganda ABCD",
    ".wordSelect-Selectable": "Soal Select Word Kata",
  };

  return await namaSelector[select];
}

async function helpProgram() {
  console.log("opening project wiki...");
  await open(
    "https://github.com/myudak/learnSocial-hack/blob/main/README.md#-project-wiki"
  );
}

async function cekAdaGak(p, select) {
  try {
    await p.waitForSelector(select, { timeout: 50 });
    console.log("ok gas");
    return true;
  } catch (error) {
    console.error("gk ketemu jing:", await selectorToNama(select));
    return false;
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

export { tungguClick, exitProgram, rl, cekAdaGak, helpProgram, selectorToNama };
