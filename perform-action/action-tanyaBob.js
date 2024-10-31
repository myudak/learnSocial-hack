import fetch from "node-fetch";
import { API_LINK } from "../config/mainConfig.js";

async function performActionTanyaBob(history, userMessage) {
  history.push({ role: "user", content: userMessage });

  try {
    const response = await fetch(API_LINK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        history,
        lang: "youda",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const assistantMessage = data.queries;
      console.log("BOB 😶‍🌫️:", assistantMessage);

      history.push({ role: "assistant", content: assistantMessage });
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      console.log("Error:", data.error);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
}

export default performActionTanyaBob;
