import { useState, useEffect, useCallback } from "react";
import SingleCard from "./components/SingleCard";
import { CARD_IMAGES } from "./constants/card";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = useCallback(() => {
    const shuffledCards = [...CARD_IMAGES, ...CARD_IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: crypto.randomUUID() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }, []);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) =>
          prev.map((c) =>
            c.src === choiceOne.src ? { ...c, matched: true } : c,
          ),
        );
        resetTurn();
      } else {
        setTimeout(resetTurn, 800);
      }
    }
  }, [choiceOne, choiceTwo, resetTurn]);

  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  return (
    <main className="min-h-screen bg-[#260a42] text-white p-8 flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">Magic Memory</h1>
        <p className="text-gray-300">Challenge your visual memory</p>
      </header>

      <div className="flex gap-6 items-center mb-8">
        <button
          onClick={shuffleCards}
          className="bg-white text-[#260a42] px-6 py-2 rounded-lg font-bold hover:bg-pink-500 hover:text-white transition-colors"
        >
          New Game
        </button>
        <span className="text-xl font-mono">Turns: {turns}</span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-2xl w-full">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <footer className="mt-12 text-xs opacity-60">
        A project from a React JS training - Coded by{" "}
        <a
          href="https://bilalturkmen.com"
          className="underline hover:text-pink-400"
          target="_blank"
          aria-label="visit the coder's webpage"
        >
          Bilal Türkmen
        </a>
      </footer>
    </main>
  );
}

export default App;
