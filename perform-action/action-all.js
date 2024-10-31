import { cekAdaGak } from "../utils/utils.js";
import performActionCeklis from "./action-ceklis.js";
import performActionDropDown from "./action-dropdown.js";
import performActionDuaPart from "./action-dua-part.js";
import performActionIsian from "./action-isian.js";
import performActionIsianTextBox from "./action-isianTextBox.js";
import performActionABCD from "./action-pilgan.js";
import performActionSelectWord from "./action-selectWord.js";
import performActionWordGap from "./action-wordGap.js";

async function performActionAll(page) {
  while (1) {
    if (await cekAdaGak(page, ".mcqAlignedItem"))
      await performActionCeklis(page);
    else if (await cekAdaGak(page, ".dropDownBox"))
      await performActionDropDown(page);
    else if (await cekAdaGak(page, ".pendingPair"))
      await performActionDuaPart(page);
    else if (await cekAdaGak(page, ".textEntry-textArea"))
      await performActionIsian(page);
    else if (await cekAdaGak(page, ".textEntry-textBox"))
      await performActionIsianTextBox(page);
    else if (await cekAdaGak(page, ".mcqInlineItem"))
      await performActionWordGap(page);
    else if (await cekAdaGak(page, ".mcqItemStyle"))
      await performActionABCD(page);
    else if (await cekAdaGak(page, ".wordSelect-Selectable"))
      await performActionSelectWord(page);
    else break;
  }
}

export default performActionAll;
