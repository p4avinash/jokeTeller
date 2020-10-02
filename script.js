const button = document.querySelector("#button");
const audioElement = document.querySelector("#audio");

//diable/enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

//tell me function
function tellMe(joke) {
  VoiceRSS.speech({
    key: "0aa34d7d67774b06b1834ca892a911b8",
    src: joke,
    hl: "en-us",
    v: "Mary",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//fetching the jokes
async function fetchJokes() {
  try {
    let joke = "";
    apiUrl = `https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=religious,political,racist`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}.......${data.delivery}`;
    } else {
      joke = `${data.joke}`;
    }
    tellMe(joke);
    //disable button
    toggleButton();
  } catch (error) {
    console.log(error);
  }
}

//Evnet listeners
button.addEventListener("click", fetchJokes);
audioElement.addEventListener("ended", toggleButton);
