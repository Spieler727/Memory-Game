import './App.css';

import { useEffect, useState, useRef } from 'react';
import CardObject from './Components/CardObject';

const cardImagesEasy = [
  { src : "/react-images/fortune.png", matched: false},
  { src : "/react-images/chariot.png", matched: false},
  { src : "/react-images/fortune2.png", matched: false},
  { src : "/react-images/lovers.png", matched: false},
  { src : "/react-images/emperor.png", matched: false},
  { src : "/react-images/hierophant.png", matched: false},
]

const cardImagesMedium = [
  { src : "/react-images/fortune.png", matched: false},
  { src : "/react-images/chariot.png", matched: false},
  { src : "/react-images/fortune2.png", matched: false},
  { src : "/react-images/lovers.png", matched: false},
  { src : "/react-images/emperor.png", matched: false},
  { src : "/react-images/hierophant.png", matched: false},
  { src : "/react-images/sslovers.jpeg", matched: false},
  { src : "/react-images/judgement.png", matched: false},
]

const cardImagesHard = [
  { src : "/react-images/fortune.png", matched: false},
  { src : "/react-images/chariot.png", matched: false},
  { src : "/react-images/fortune2.png", matched: false},
  { src : "/react-images/lovers.png", matched: false},
  { src : "/react-images/emperor.png", matched: false},
  { src : "/react-images/hierophant.png", matched: false},
  { src : "/react-images/sslovers.jpeg", matched: false},
  { src : "/react-images/judgement.png", matched: false},
  { src : "/react-images/moon.jpeg", matched: false},
  { src : "/react-images/sun.jpeg", matched: false},
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [turnsId, setTurnsId] = useState(null)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [finished, setFinished] = useState(false)
  const [difficulty, setDifficulty] = useState("easy")

 
  //shuffling cards 
  const shuffle = (difficulty) => {
    let cardImages = cardImagesEasy;

    if (difficulty === "easy") {
      cardImages = cardImagesEasy;
    }
    else if (difficulty === "medium") {
      cardImages = cardImagesMedium;
    } 
    else if (difficulty === "hard") {
      cardImages = cardImagesHard;
    } 
  
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
      setTurnsId(Math.random());
      setFinished(false)
    
    setCards((prevCards) =>
      prevCards.map((card) => ({ ...card, matched: true }))
    );
  
    setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, matched: false }))
      );
      setDisabled(false);
      setFinished(false);
    }, 1900);
    
  }

  const shuffleOnChange = (event) => {
    const newDifficulty = event.target.value;
    setDifficulty(newDifficulty);
    shuffle(newDifficulty);
  }


  //handling choices
  const handleChoice = (card) => {
    //If choiceOne is null/false, it means choiceOne has not been set yet, thus running setChoiceOne
    //If choiceOne is not null (aka true), it means choiceOne has already been picked, thus running setChoiceTwo 
    //choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

    if(choiceOne && choiceOne === card){
      return
    }

    if(choiceOne){
      setChoiceTwo(card)
      setDisabled(true)
    }
    else{
      setChoiceOne(card)
    }
  }

  //Comparing two selected cards
  //When either choiceOne or choiceTwo are updated, this function is called
  useEffect(() => {
    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      if (turnsId === turnsIdRef.current) {
        setTurns(totalTurns => totalTurns + 1);
      }
      setDisabled(false)
    }
    
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            }
            else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        setTimeout(() =>resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo, turnsId])
  

 
  
  const turnsIdRef = useRef();
  useEffect(() => {
    turnsIdRef.current = turnsId;
  }, [turnsId]);

  useEffect(() => {
    const allMatched = cards.every(card => card.matched);
    if (allMatched){
      setFinished(true);
    }
    if(finished === true && turns > 0){
      setTimeout(() => alert("Game Finished!"), 500)
    }
  }, [cards, finished, turns])

  let gridClassName = ""

    if(difficulty === "easy") {
        gridClassName = "card-grid-easy"
    }
    else if(difficulty === "medium") {
        gridClassName = "card-grid-medium"
    }
    else if(difficulty === "hard") {
      gridClassName = "card-grid-hard"
    }

  return (
    <div className="App">
      <div class="heading">
        <h1>Memory Game</h1>
      </div>

      <div class="game-options">
        <div class="reset-section">
          <button class="reset-button" onClick={() => shuffle(difficulty)}>New Game</button>
        </div>
        
        <div class="difficulty-section">
          <button class="difficulty-button-container">
            <label for="difficulty">Difficulty:</label>
            <select name="difficulty" id="difficulty-select" value={difficulty}
              onChange={shuffleOnChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </button>
        </div>
      </div>

      <div class="game-stats">
        <p>Turns: {turns}</p>
      </div>
      
      <div id={`${gridClassName}`} className="card-grid">
        {cards.map(card => (
          <CardObject 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          difficulty={difficulty}
          />
        ))}

      </div>
    </div>
  );
}

export default App;
