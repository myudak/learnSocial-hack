// api.js
import fetch from "node-fetch";

const LINK = "https://myudak.site/api/undip";

async function performActionTanyaBob(history, userMessage) {
  history.push({ role: "user", content: userMessage });

  try {
    const response = await fetch(LINK, {
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
