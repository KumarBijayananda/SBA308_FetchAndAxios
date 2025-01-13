const highScores = document.getElementById("highScores");

export async function getRecord() {
  try {
    highScores.append("Score Leaderboard!!");
    //get method to get a random word from api
    const response = await axios.get(
      "https://api.restful-api.dev/objects/ff808181932badb601945c4de9c41d71"
    );
    const record = response.data;
    //  = randomWord.toString().toUpperCase(); //changing the response object to upper case string
    let i = 0;
    const ol = document.createElement("ol");
    while (record.data.name[i]) {
      if (record.data.name[i]) {
        const li = document.createElement("li");
        li.textContent = `${record.data.name[i]} : ${record.data.score[i]}`;
        ol.appendChild(li);
        // console.log("response from names: " + record.data.name[i]);
        // console.log("response from scores: " + record.data.score[i]);
      }
      i++;
    }
    highScores.appendChild(ol);
  } catch (error) {
    console.log("Error from record: " + error);
  }
}

export async function putRecord(names, scores) {
  const response = await axios.put(
    "https://api.restful-api.dev/objects/ff808181932badb601945c4de9c41d71",
    {
      name: "GuessWorld",
      data: {
        name: names,
        score: scores,
        // name: [
        //   "Dr. Doom",
        //   "Mr. White",
        //   "Snake",
        //   "Player1",
        //   "Sara",
        //   "Doge Coin",
        //   "Snake",
        //   "WrongGuy",
        //   "Kumar",
        //   "Aaroh",
        // ],
        // score: [500, 450, 300, 280, 250, 240, 220, 200, 180, 160],
      },
    }
  );
}

export async function checkHighScore(score) {
  try {
    let placeName = "";
    const names = [];
    const scores = [];
    const response = await axios.get(
      "https://api.restful-api.dev/objects/ff808181932badb601945c4de9c41d71"
    );
    const record = response.data;
    //  = randomWord.toString().toUpperCase(); //changing the response object to upper case string
    let place = 0;
    console.log("score:" + score);
    for (let i = 0; i < 10; i++) {
      names.push(record.data.name[i]);
      scores.push(record.data.score[i]);
      if (score > record.data.score[i]) {
        if (place === 0) {
          place = i + 1;
        }
      }
    }
    if (place > 0) {
      placeName = window.prompt(
        "You've placed on leaderboard!! Enter you name."
      );
      if (placeName) {
        names.splice(place - 1, 0, placeName);
        scores.splice(place - 1, 0, score);
      }
      putRecord(names, scores);
    }
  } catch (error) {
    console.log("Error from record: " + error);
  }
}
