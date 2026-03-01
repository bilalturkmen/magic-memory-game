export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  return (
    <div className="relative perspective-1000">
      <div
        className={`transition-all duration-500 preserve-3d ${flipped ? "rotate-y-180" : ""}`}
      >
        <img
          className="block w-full border-2 border-white rounded backface-hidden rotate-y-180"
          src={card.src}
          alt="card front"
        />

        <img
          className="absolute top-0 left-0 block w-full border-2 border-white rounded cursor-pointer backface-hidden"
          src="/img/cover.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
