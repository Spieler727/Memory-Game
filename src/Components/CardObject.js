
import './CardObject.css'
import './CardObjectMedium.css'
import './CardObjectHard.css'

export default function CardObject({card, handleChoice, flipped, disabled, difficulty}){
    const handleClick = () => {
        if (!disabled){
            handleChoice(card)
        }
        
    }
    let cardClassName = ""

    if(difficulty === "easy") {
        cardClassName = "card-easy"
        
    }
    else if(difficulty === "medium") {
        cardClassName = "card-medium"
        
    }
    else if(difficulty === "hard") {
        cardClassName = "card-hard"
        
    }

    return (
        <div id={`${cardClassName}`} className="card">
            
            <div className={flipped ? "flipped" : ""}>
              <img className="front" src={process.env.PUBLIC_URL + card.src} alt="card-front" />
              <img className="back" src={process.env.PUBLIC_URL + "/react-images/cardback.png"} onClick={handleClick} alt="card-back" />
            </div>

        </div>
    )
}
