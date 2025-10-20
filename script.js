document.addEventListener('DOMContentLoaded', () => {
  const wordEl = document.getElementById("word");
  const inputEl = document.getElementById("input");
  const timeEl = document.getElementById("time");
  const scoreEl = document.getElementById("score");
  const wpmEl = document.getElementById("wpm");

  const words = ["quant", "finance", "python", "trader", "model", "data", "risk", "alpha", "hedge", "portfolio"];
  let time = 30;
  let score = 0;
  let currentWord = "";

  function newWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    if (wordEl) wordEl.textContent = currentWord;
    if (inputEl) inputEl.value = "";
    if (inputEl) inputEl.focus();
  }

  if (inputEl) {
    inputEl.addEventListener("input", () => {
      // require exact match (trim to ignore accidental leading/trailing spaces)
      if (inputEl.value.trim() === currentWord) {
        score++;
        if (scoreEl) scoreEl.textContent = score;
        newWord();
      }
    });
  }

  const timer = setInterval(() => {
    time--;
    if (timeEl) timeEl.textContent = time;
    if (time <= 0) {
      clearInterval(timer);
      if (inputEl) inputEl.disabled = true;
      const wpm = Math.round((score / 30) * 60);
      if (wpmEl) wpmEl.textContent = wpm;
      alert(`Time's up! Your WPM: ${wpm}`);
    }
  }, 1000);

  newWord();
});
/*
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f6f5f3;
  text-align: center;
  margin-top: 80px;
  color: #333;
}

input {
  padding: 10px;
  width: 300px;
  font-size: 18px;
}

.stats {
  margin-top: 20px;
}
*/
