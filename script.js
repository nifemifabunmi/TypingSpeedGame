document.addEventListener('DOMContentLoaded', () => {
  const wordEl = document.getElementById("word");
  const inputEl = document.getElementById("input");
  const timeEl = document.getElementById("time");
  const scoreEl = document.getElementById("score");
  const wpmEl = document.getElementById("wpm");
  const accuracyEl = document.getElementById("accuracy");
  const difficultyEl = document.getElementById("difficulty");

  const wordsByDifficulty = {
    easy: ["cat", "dog", "run", "jump", "play", "fast", "slow", "bird", "fish", "book"],
    medium: ["quant", "finance", "python", "trader", "model", "data", "risk", "alpha", "hedge", "portfolio"],
    hard: ["algorithm", "derivative", "volatility", "correlation", "regression", "optimization", "stochastic", "analysis", "probability", "distribution"]
  };

  let time = 30;
  let score = 0;
  let currentWord = "";
  let totalCharacters = 0;
  let incorrectCharacters = 0;

  function newWord() {
    const difficulty = difficultyEl.value;
    const words = wordsByDifficulty[difficulty];
    currentWord = words[Math.floor(Math.random() * words.length)];
    if (wordEl) wordEl.textContent = currentWord;
    if (inputEl) inputEl.value = "";
    if (inputEl) inputEl.focus();
  }

  function updateAccuracy() {
    const accuracy = totalCharacters === 0 ? 100 : Math.round(((totalCharacters - incorrectCharacters) / totalCharacters) * 100);
    if (accuracyEl) accuracyEl.textContent = accuracy;
  }

  if (difficultyEl) {
    difficultyEl.addEventListener("change", newWord);
  }

  if (inputEl) {
    inputEl.addEventListener("input", (e) => {
      const currentInput = inputEl.value;
      const currentLength = currentInput.length;
      
      // Check accuracy for the current input
      for (let i = 0; i < currentLength; i++) {
        if (i >= totalCharacters) {
          totalCharacters++;
          if (currentInput[i] !== currentWord[i]) {
            incorrectCharacters++;
          }
        }
      }
      updateAccuracy();

      // Check if word is completed
      if (currentInput.trim() === currentWord) {
        score++;
        if (scoreEl) scoreEl.textContent = score;
        totalCharacters = 0;
        incorrectCharacters = 0;
        updateAccuracy();
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
