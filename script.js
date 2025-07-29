function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getJoke() {
  const genre = document.getElementById("genre").value;
  const jokeBox = document.getElementById("jokeBox");
  jokeBox.innerHTML = "<p>⏳ Fetching a hilarious joke...</p>";

  const url = `https://v2.jokeapi.dev/joke/${genre}?safe-mode`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      jokeBox.innerHTML = "<p>😢 Could not load a joke. Try again.</p>";
    } else {
      if (data.type === "single") {
        // Single-line joke
        jokeBox.innerHTML = `<p>😂 ${data.joke}</p>`;
      } else if (data.type === "twopart") {
        // Two-part joke with animated delay
        jokeBox.innerHTML = `<p>🧐 ${data.setup}</p>`;
        await delay(2500); // wait 2.5s before showing punchline
        jokeBox.innerHTML += `<p>👉 ${data.delivery}</p>`;
      }
    }
  } catch (err) {
    jokeBox.innerHTML = "<p>⚠️ Error: Failed to fetch joke.</p>";
  }
}
