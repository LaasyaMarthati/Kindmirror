// == sentiment.js ==
function getVisibleText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let text = "";
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const style = window.getComputedStyle(node.parentElement);
    if (style && style.visibility !== "hidden" && style.display !== "none") {
      text += node.textContent + " ";
    }
  }
  return text;
}

function analyzeSentiment(text) {
  text = text.toLowerCase();
  const positiveWords = ["happy", "excited", "grateful", "calm", "joy", "beautiful", "love", "laugh", "relaxing"];
  const negativeWords = ["sad", "angry", "hate", "tired", "lonely", "anxious", "bored", "depressed"];
  let score = 0;
  for (const word of positiveWords) {
    if (text.includes(word)) score++;
  }
  for (const word of negativeWords) {
    if (text.includes(word)) score--;
  }
  return score;
}

function addActionToPrompt(promptText, type) {
  const actions = {
    positive: [🌼 "Take a screenshot of your smile, or message someone a kind thought.",
      "🎨 Doodle your current feeling on paper.",
      "🎵 Play your favorite song and dance a little.",
      "📷 Take a picture of something beautiful nearby.",
      "💌 Write a one-line compliment and text it to a friend.",
      "📖 Journal one thing you're grateful for today.",
      "🚶 Take a 2-minute walk, even if just around your room.",
      "🕯️ Light a candle or smell something pleasant.",
      "🧃 Sip a drink and savor its taste for 10 seconds.",
      "🧘 Try box breathing (inhale-hold-exhale-hold for 4 sec).",
      "🔅 Turn off one light and enjoy the natural ambiance.",
      "🌐 Compliment someone online (kindly!).",
      "🌳 Look at something green—plant, photo, anything.",
      "📥 Send yourself a kind email.",
      "🔔 Set a timer for joy—schedule a break soon.",
      "🧠 Think of a happy memory from the past week.",
      "Reflect on one person who made you smile today.",
      "📝 Write a short list of your recent wins.",
      "🌟 Compliment your reflection right now.",
      "🎁 Give yourself permission to feel proud."],
    negative: ["🧘 Stand up, stretch your arms, and take 3 deep breaths.",
      "📵 Turn your phone face-down for 2 minutes.",
      "Look in the mirror and say: 'I'm doing my best.'",
      "🚰 Drink a glass of water slowly.",
      "📓 Write down one sentence of how you’re feeling.",
      "🌬️ Inhale for 5 sec, hold for 5, exhale for 5.",
      "🛋️ Sit down, close your eyes, and focus on one sound.",
      "🌸 Name 3 things you can see, hear, and touch.",
      "💤 Lay your head back and rest for 1 minute.",
      "📴 Turn off one notification just for now.",
      "🧦 Put on cozy socks or grab a warm blanket.",
      "🫧 Watch something calming like nature or ASMR.",
      "🖐️ Massage your hands for 30 seconds.",
      "🖼️ Look at a comforting image or memory.",
      "🌙 Whisper something kind to yourself right now.",
      "🧩 Write one thing that’s bothering you—then crumple it.",
      "💔 Acknowledge one pain and say: 'This too shall pass.'",
      "🔄 Close your eyes and gently roll your shoulders.",
      "🍵 Make a warm drink and sip it slowly.",
      "📨 Send a kind message to someone else in need."],
    neutral: ["⏳ Set a 2-minute timer and do nothing. Just sit with yourself.",
      "🪑 Sit up straight and take a deep breath.",
      "🔄 Look away from your screen for 20 seconds.",
      "🔇 Mute your tab and observe your surroundings.",
      "🧼 Wash your hands slowly with attention.",
      "📘 Read one sentence from a book nearby.",
      "🎧 Listen to 30 seconds of instrumental music.",
      "🌈 Name one small thing that went well today.",
      "💭 Think about a place you feel peaceful.",
      "📦 Organize one small thing near you.",
      "🛎️ Set a reminder to check in with yourself tonight.",
      "🌿 Breathe deeply while looking at something natural.",
      "📅 Plan one micro-goal for tomorrow.",
      "📱 Close one app that’s not serving you.",
      "🔕 Turn on Do Not Disturb for 5 minutes.",
      "📴 Take a tech pause for 1 minute.",
      "🔍 Observe your thoughts without judgment.",
      "🗒️ Write down a neutral fact about your day.",
      "Look out of the window and just gaze.",
      "🎲 Choose to do something slightly unexpected."]
  };

  const selected = actions[type][Math.floor(Math.random() * actions[type].length)];
  return `${promptText}\n💡 Quick Action: ${selected}`;
}

function getMoodPrompt(score) {
  const positivePrompts = ["🌞 Your joy is radiant—let it ripple out to others!",
    "🕊️ This moment of lightness can carry you forward all day.",
    "🎉 Your energy is contagious—what would you create today?",
    "💛 Gratitude blooms in your scroll—let it ground your path.",
    "🌟 You shine even when just resting—notice the glow inside.",
    "📸 Pause and mentally capture this calm. It’s golden.",
    "🎈 A burst of joy just found you—float with it awhile.",
    "🎶 This rhythm of peace you're in? Let it soundtrack your day.",
    "💡 You’re clearly aligned with something beautiful—stay close to it.",
    "🌼 Joy feels safe with you—welcome it like a friend.",
    "☀️ Let the warmth in your chest become your compass.",
    "🚀 Inspiration arrives quietly—did you feel it just now?",
    "🎨 This scroll is your palette—how do you want your day to look?",
    "📖 You’re writing a good chapter. Highlight this moment.",
    "🌅 You’re scrolling through sunrise energy—pause and feel it.",
    "🌻 Peace is finding you again. Let it stay a little longer.",
    "🌈 You're aligned with hope. Carry some forward.",
    "🪞 Your joy is real. Reflect it, don’t second guess it.",
    "🪁 You look free in this moment. Keep flying.",
    "🧠 This peace? It’s your natural state, not just a pause.",
    "🌍 You’re in sync with your digital space. That’s rare and lovely.",
    "🌬️ Your breath is calm—like a clear sky inside.",
    "📦 You just unwrapped a small gift of clarity—keep it safe.",
    "✨ You’re scrolling through light. Let it refill you.",
    "🧭 This calm is guiding you somewhere beautiful—stay curious.",
    "🎁 Joy without reason is reason enough. Receive it."];
  const negativePrompts = [ "🌧️ Feeling heavy? You're not alone. Take a small pause, just for you.",
    "🫧 Overwhelm often hides in autopilot—gently notice if you’re there.",
    "🕯️ What would it look like to be soft with yourself right now?",
    "🍂 Sadness isn't weakness. It’s a signal to tend inward.",
    "🪶 Let yourself land gently. No need to keep pushing.",
    "🎭 You don’t have to perform here—feel what you feel.",
    "🛑 Pause. Not because you're broken, but because you matter.",
    "🌒 This might be your low tide. Rest until you rise.",
    "🥀 Notice the ache—then breathe right through it.",
    "🌌 You're not lost. You're in a dim hallway. Keep walking.",
    "🫀 Your feelings are real. Let them be without rushing them out.",
    "🌙 Hold yourself the way you’d hold a tired friend.",
    "📉 The scroll isn’t helping? A quiet stretch might.",
    "🛏️ Fatigue isn’t failure. Your body is whispering, not complaining.",
    "🍵 Maybe what you need isn’t here. A sip of water might reveal more.",
    "🎈 Lightness will return. For now, loosen your grip.",
    "🧣 Wrap yourself in kindness like a familiar blanket.",
    "📴 What if disconnecting is an act of self-respect?",
    "🌫️ It’s okay if nothing feels clear. Don’t force the fog to lift.",
    "🖐️ Gentle is a valid pace. Especially now.",
    "🔕 You don’t need more content—you need less noise.",
    "🫂 You deserve softness. Especially when you resist it.",
    "⏳ Scrolling won’t solve this. Breathing might.",
    "🧘 You’ve been holding too much. Let go for just a breath.",
    "🧩 Something’s off? Maybe the answer isn’t here—but you are."];
  const neutralPrompts = ["🔁 Not sure what you’re seeking? That’s okay. Awareness is the start.",
    "🎯 Mindless scroll or meaningful pause? You get to choose.",
    "🧭 This moment is directionless—and full of possibility.",
    "🧘‍♂️ Notice how your body feels. Not the screen—just you.",
    "💬 Stillness in a sea of noise is radical. Take some.",
    "🕰️ Your attention is valuable. Want to spend it with intention?",
    "🌥️ You’re in between clouds. Wait for the view—or change skies.",
    "📍 Right now is a great place to check in.",
    "🤖 Habit or choice? Tap out and find the difference.",
    "🧪 What if you ran an experiment: 5 minutes offline?",
    "🎢 You don’t need another video—you need a small exhale.",
    "🖼️ You’ve seen a lot. Let your eyes rest on something real.",
    "🎈 Float for a second. Don’t anchor to anything yet.",
    "💠 What does your heart want to see next—not your thumb?",
    "🌐 The internet is endless. Your energy isn’t. Use it gently.",
    "🎮 You’re not passive—you’re a player. Want to take the controller back?",
    "🧩 These pieces aren’t forming anything yet. Step back, breathe.",
    "🎭 You’re wearing your scroll face. Want to switch it for realness?",
    "🚪 What if the exit is peace? Would you take it now?",
    "📓 Maybe the next best scroll is your own thoughts.",
    "🧠 Your brain is whispering: enough. Will you listen?",
    "🌵 Even the desert has beauty in pause. Find your oasis.",
    "📡 You’ve consumed a lot. Want to transmit something instead?",
    "🧃 Take a sip. Hydration > more content. Seriously.",
    "🌟 A gentle pivot is power. This might be the moment."];

  if (score > 1) {
    const prompt = positivePrompts[Math.floor(Math.random() * positivePrompts.length)];
    return addActionToPrompt(prompt, 'positive');
  }
  if (score < -1) {
    const prompt = negativePrompts[Math.floor(Math.random() * negativePrompts.length)];
    return addActionToPrompt(prompt, 'negative');
  }
  const prompt = neutralPrompts[Math.floor(Math.random() * neutralPrompts.length)];
  return addActionToPrompt(prompt, 'neutral');
}
(function monitorYouTubeShorts() {
  if (location.hostname.includes("youtube.com") && location.href.includes("shorts")) {
    const startTime = Date.now();

    setInterval(() => {
      const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
      if (elapsedMinutes > 15) {
        // Create and display custom sentiment popup
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.bottom = '20px';
        popup.style.right = '20px';
        popup.style.padding = '16px';
        popup.style.backgroundColor = '#fffbea';
        popup.style.border = '1px solid #ffd700';
        popup.style.borderRadius = '12px';
        popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
        popup.style.fontSize = '16px';
        popup.style.zIndex = '10000';
        popup.innerText = "🛑 You've been watching YouTube Shorts for over 15 minutes.\n💡 Quick Action: Take a short break and stretch!";

        document.body.appendChild(popup);

        setTimeout(() => {
          popup.remove();
        }, 10000);
      }
    }, 60000); // check every minute
  }
})();
