'use client'

const { useState, useEffect } = require("react") 
const baseCards = ['😀', '👍', '🗿', '🍉', '🥄', '🫥'] 

export default function matchingGame(){
  const [board, setBoard] = useState([])
  const [firstPick, setFirstPick] = useState(null)
  const [secondPick, setSecondPick] = useState(null)
  const [locked, setLocked] = useState(false)
  const [gameStarted, setGameStarted] = useState(false) 
  const [isGameOver, setIsGameOver] = useState(false) 

  function generateBoard() {
    const mixedCards = [...baseCards, ...baseCards].sort(() => Math.random() - 0.5)

    const formattedCards = mixedCards.map((c) => {
      return {
        id: Math.random(), 
        value: c,  
        isFlipped: false,
        isMatched: false
      }
    })

    setBoard(formattedCards)
  }

  function handleChoice(card){
    if(card.isFlipped || card.isMatched || locked){
      return
    }

    const newBoard = board.map((c) => {
      if(c.id === card.id){
        return {...c, isFlipped: true}
      }
      return c
    })

    setBoard(newBoard)

    if (firstPick === null){
      setFirstPick(card)
    } else {
      setSecondPick(card)
    }
  }

  useEffect(() => {
    if (firstPick && secondPick){
      setLocked(true)
    

      if(firstPick.value === secondPick.value){
        const newBoard = board.map((c) => {
          if (c.id === firstPick.id || c.id === secondPick.id){
            return {...c, isMatched: true}
          }
          return c
        })

        setBoard(newBoard)
        setFirstPick(null)
        setSecondPick(null)
        setLocked(false)

        const allMatched = newBoard.every((card) => card.isMatched)
        if (allMatched) {
          setIsGameOver(true)
        }
      } else {
        setTimeout(() => {
          const newBoard = board.map((c) => {
            if (c.id === firstPick.id || c.id === secondPick.id) {
              return { ...c, isFlipped: false }
            }
            return c
          }) 

          setBoard(newBoard) 
          setFirstPick(null)
          setSecondPick(null)
          setLocked(false)

          const allMatched = newBoard.every((card) => card.isMatched)
          if (allMatched) {
            setIsGameOver(true)
          }
        }, 1000) 
      }
    }
  }, [firstPick, secondPick])

  return (
    <div className="board">
      {!gameStarted && (
        <button onClick={() => { generateBoard(), setGameStarted(true) }}>
          Start Game
        </button>
      )}
      
      {board.map((card) => {
        return (
          <div key={card.id} className="card" onClick={() => handleChoice(card)}>
            {card.isFlipped || card.isMatched ? card.value : "?"}
            {/* {card.value} */}
          </div>
        )
      })}
      
      {isGameOver && (
      <div className="win-screen">
        <h2>You Won!</h2>
        <button onClick={() => { 
            generateBoard()  
            setIsGameOver(false) 
          }}>
          Play Again
        </button>
      </div>
    )}
    </div>
  )
}