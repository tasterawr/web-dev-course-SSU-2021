
# Hangman Browser Game

Based on an old classic "hangman" game. You can read the description on this Wikipedia [page].
## Game entities
The main and only game entity is game field, which is represented by one of the 3 available game rooms. Game room is the context of a game. You can see description of all game rooms in the table below:

| Game room | Description |
| ------ | ------ |
| Hangman | Classical hangman style. A room with gallows and a hangman. Player's goal is to not allow all 6 elements of the hangman's body to appear, which is considered to be gameover.<br><img src="https://user-images.githubusercontent.com/70659948/160475491-e569b011-06cc-4802-b2af-0df2fce300a3.JPG" width="400"/>|
| Drowner | Modification of a hangman idea. Instead of gallows, the room portrays a person in a chamber, which is slowly filled with water. Player's goal is to not allow the person drown in the water, which rises up in 6 stages. <br><img src="https://user-images.githubusercontent.com/70659948/160476165-ee155d3b-ad50-42b9-9a0a-f07cbb158abd.JPG" width="400"/>|
| Zombie apocalypse | The room portrays a person escaping from the zombie horde. Player's goal is to not allow the person to be eaten by zombies xD. Zombies get close to the person in 6 stages. <br> <img src="https://user-images.githubusercontent.com/70659948/160476163-d13b80a3-6b65-4f67-93ca-e71863da51a8.JPG" width="400"/>|
## Game rules
The game rules are pretty simple. In the main menu the player chooses one of the avalilable question topics and a game room type and then proceeds to the game. The game generates a question from the chosen topic, which is connected to one word (the answer) and suggests player to interact with on-screen keyboard to guess the letters from the answer. Player can see their guessed letters and gaps instead of missing letters. If the letter of the answer is guessed right, the corresponding gap is replaced with it (if the letter is included multiple times in the answer, multiple gaps are replaced). If the letter is not included in the word, the "wrong guesses" counter value is incresed by 1 and the game room state is changed. If the word is guessed, the player proceeds to the next question. If the "wrong guesses" counter reaches the value of 6, the game is over.
## Difficulties
The game suggests 4 levels of difficulties, which are described in the table below:
| Difficulty | Description |
| ------ | ------ |
|Easy (Простой)|The player has 6 attempts to guess the answer letters and no time limit.|
|Medium (Средний)|The player has 6 attempts and 45 seconds to guess the answer letters. With every guessed letter 5 seconds are added to the timer. |
|Hard (Сложный)|The player has 6 attempts and 30 seconds to guess the answer letters. With every guessed letter 2 seconds are added to the timer. |
|Very hard (Очень сложный)|The player has 6 attempts and **only** 30 seconds to guess the answer letters. |
## Controls
Player interacts with game via buttons. The main controls are buttons of on-screen keyboard. Basic view of on-screen keyboard allows to interact with Russian symbols. To show English symbols buttons, player should check "English letters" ("Английские буквы") checkbox. 
>If the letter has already been guessed, clicking on the corresponding button won't show any effect.
## Used technologies
* HTML
* SCSS
* JavaScript
## Project structure
* **src** — main sources folder
* **images/content** — folder for storing images
* **scss** — folder for storing scss files
* **questions** — folder for storing questions in **questions.txt** file
* **js** — folder for storing JavaScript files
* **index.html**
## Build Assets

### One time build assets for development

```sh
$ npm run build
```

### Build assets and enable source files watcher

```sh
$ npm run watch
```

### Start a development server - reloading automatically after each file change.

```sh
$ npm run dev
```

### Build Assets for production

```sh
$ npm run production
```
## Additional resources
* [Vecteezy](https://www.vecteezy.com/) stock service was used for finding image sources.
* [Photopea](https://www.photopea.com/) online editor was used to edit images online.

[page]: <https://en.wikipedia.org/wiki/Hangman_(game)>

