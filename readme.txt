Guess the word game

This is a game where the user has to guess the word based on hints like synonyms, antonyms, \
and getting the letters of the word but it will cost you points. Below are the rules of the game:

You begin with 100 points.
Every letter costs 10 points, synonyms and antonyms cost 20 points.
Letters are randomized and you may get the same letter again!
You need to guess as many words as possible in two minutes.
If your score is in top 10 high scores, you'll enter the leaderboard!!

There are three .js files that controls the along with index.html and style.css. The three .js files are:

app.js - This is the main files that imports and exports functions as necessary to make the game work.

gameFunc.js - This file contains the functions to clear the tiles, bring focus to each input as players
enter the word and validate if the entered word is correct.

scores.js - This files gets the leaderboard, using the Axios get method to update