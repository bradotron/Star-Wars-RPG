# Star Wars RPG

[Github](https://github.com/bradotron/Star-Wars-RPG)
[Deployed App](https://bradotron.github.io/Star-Wars-RPG/)

# Using the App
## Step One: 
The game presents the player with a board of four characters to choose from. The player clicks on their desired character to begin the game.

## Step Two: 
Once the player has chosen a character, the player must then click on an opponent (indicated by red outline).

## Step Three: 
Now the player clicks the attack button to attack the opponent. The player can continue attacking this opponent until either the player or the opponent are defeated, or the player can select a different opponent to attack.

## Character Stats:
### Attack Power (Atk):
Attack Power is the number that, when used as the players character, this character will hit an opponent for. It is imporantant to know that after each successful attack, the attack power of a character will increase by the base attack amount for that character.

### Health Points (HP):
Health Points is the amount of life a character has. Each attack or counter attack will decrement the health points by the attack amount. When health points are zero, that character is defeated.

### Counter Attack Power (Ctr):
When the player attacks an opponent, the opponent will attack the character for this amount (if the opponent survives the players attack).

# File Structure
```
|-- ProjectRoot
    |-- index.html
    |-- README.md
    |-- assets
    |   |-- css
    |   |   |-- reset.css
    |   |   |-- style.css
    |   |-- images
    |   |   |-- darth_vader_125x125.jpg
    |   |   |-- Death-Star-Backgrounds.jpg
    |   |   |-- han_solo_125x125.jpg
    |   |   |-- luke_skywalker_125x125.jpg
    |   |   |-- palpatine_125x125.jpg
    |   |-- javascript
    |       |-- game.js
    |-- Instructions
        |-- homework_instructions.md
        |-- Images
            |-- 1-CrystalCollector.jpg
            |-- 2-StarWars.jpg

```
