// Suggested code may be subject to a license. Learn more: ~LicenseLog:3528408128.
// src/Game.jsx
import React, { useState, useEffect } from 'react';
import Card from './Card'; // Import the Card component
import './Game.css'; 


const totalCards = 98;

const Game = () => {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [piles, setPiles] = useState({
    ascPile1: [1],
    ascPile2: [1],
    descPile1: [100],
    descPile2: [100],
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardsPlayedSinceDraw, setCardsPlayedSinceDraw] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [noMovesMessage, setNoMovesMessage] = useState('')
  const [invalidMoveMessage, setInvalidMoveMessage] = useState('');
  const [turn, setTurn] = useState(1)


  useEffect(() => {
    initializeDeck();
  }, []);

  const hasPossibleMoves = () => {
    // Check if any card in the hand can be played on any pile
    for (const card of hand) {
      for (const pileId of Object.keys(piles)) { 
        if (canPlayOnPile(card, piles[pileId])) {
          return true; // If any card can be played, there are possible moves
        }
      }
    }
    return false; // If no cards can be played, there are no possible moves
  };

  const initializeDeck = () => {
    const newDeck = Array.from({ length: totalCards }, (_, i) => i + 2);
    shuffleDeck(newDeck);

    const initialHand = newDeck.splice(-8); // Remove last 8 cards for hand
    setHand(initialHand);
    setDeck(newDeck); // Update deck with remaining cards
  };

  const orderHand = () => {
    const orderedHand = [...hand].sort((a, b) => a - b); // Sort hand in ascending order
    setHand(orderedHand);
  };

  const resetGame = () => {
    // Reset game state to initial values
    setDeck([]);
    setHand([]);
    setPiles({
      ascPile1: [1],
      ascPile2: [1],
      descPile1: [100],
      descPile2: [100],
    });
    setSelectedCard(null);
    setCardsPlayedSinceDraw(0);
    setGameHistory([]); // Clear game history
    initializeDeck(); // Re-initialize the deck and draw cards
  };

  const undoMove = () => {
    if (gameHistory.length === 0 ) {
      return; // Nothing to undo
    }
    if (gameHistory[gameHistory.length - 1].turn < turn || (gameHistory[gameHistory.length - 1].turn === turn && cardsPlayedSinceDraw === 0)){
      return;
    }
    const lastMove = gameHistory.pop(); // Get the last move from history
    const { prevPiles, prevHand, prevCardsPlayedSinceDraw } = lastMove;
    setPiles(prevPiles); // Restore previous piles state
    setHand(prevHand); // Restore previous hand state
    setCardsPlayedSinceDraw(prevCardsPlayedSinceDraw); // Restore cards played counter
    setGameHistory([...gameHistory]); // Update game history
  };

  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  const drawCards = () => {
    if (deck.length === 0 || cardsPlayedSinceDraw < 2) {
      return; // Don't draw if deck is empty
    }
    const newHand = [...hand];
    const cardsToDraw = Math.min(deck.length, 8 - hand.length); // Limit to 8 cards in hand
    for (let i = 0; i < cardsToDraw; i++) {
      newHand.push(deck.pop());
    }
    if (!hasPossibleMoves() && deck.length > 0) { //Only show message if deck is not empty.
        setNoMovesMessage('No moves left');
      } else {
        setNoMovesMessage(''); // Clear the message if there are moves
      }
    setHand(newHand);
    setDeck([...deck]); 
    setCardsPlayedSinceDraw(0);
    setTurn(turn + 1)
  };

  const canPlayOnPile = (card, pile) => {
    const lastCard = pile[pile.length - 1];

    if (!lastCard) {
        return true; 
      }

    switch (pile) {
      case piles.ascPile1:
      case piles.ascPile2:
        return card > lastCard || card === lastCard - 10;
      case piles.descPile1:
      case piles.descPile2:
        return card < lastCard || card === lastCard + 10;
      default:
        return false;
    }
  };

  const handleCardClick = (card) => {
    if (selectedCard === card) {
      setSelectedCard(null); // Unselect if already selected
    } else {
      setSelectedCard(card); // Select the card
    }
  };
  

  const playCard = (pileId) => { // Modified playCard function
    if (selectedCard !== null && canPlayOnPile(selectedCard, piles[pileId])) {
      setPiles(prevPiles => ({
        ...prevPiles,
        [pileId]: [...prevPiles[pileId], selectedCard],
      }));
      setHand(prevHand => prevHand.filter(c => c !== selectedCard));
      setSelectedCard(null); // Reset selected card
      setCardsPlayedSinceDraw(prevCount => prevCount + 1);
      setGameHistory([
        ...gameHistory,
        {
          prevPiles: { ...piles },
          prevHand: [...hand],
          prevCardsPlayedSinceDraw: cardsPlayedSinceDraw,
          turn: turn
        },
      ]);
  
    } else {
        setInvalidMoveMessage("Invalid move!"); // Set the message
        setTimeout(() => setInvalidMoveMessage(""), 2000); // Clear after 2 seconds
    }
  };


  // ... (Part 2: JSX for rendering will be in the next message)
// ... (Continued from Part 1)

return (
    <div className="game-container"> {/* Class for centering and background */}
      <h1>The Game - Single Player</h1>
      <h3>{turn}</h3>
      <div id="game-board"> {/* ID for game board */}
        {/* Ascending Pile 1 */}
        <div className="pile" id="asc-pile-1" onClick={() => playCard('ascPile1')}>
          
          {piles.ascPile1.length > 0 && (
            <Card key={piles.ascPile1[piles.ascPile1.length - 1]} value={piles.ascPile1[piles.ascPile1.length - 1]} />
          )}
        </div>
        {/* Ascending Pile 2 */}
        <div className="pile" id="asc-pile-2" onClick={() => playCard('ascPile2')}>
          
          {piles.ascPile2.length > 0 && (
            <Card key={piles.ascPile2[piles.ascPile2.length - 1]} value={piles.ascPile2[piles.ascPile2.length - 1]} />
          )}
        </div>
        {/* Descending Pile 1 */}
        <div className="pile" id="desc-pile-1" onClick={() => playCard('descPile1')}>
          
          {piles.descPile1.length > 0 && (
            <Card key={piles.descPile1[piles.descPile1.length - 1]} value={piles.descPile1[piles.descPile1.length - 1]} />
          )}
        </div>
        {/* Descending Pile 2 */}
        <div className="pile" id="desc-pile-2" onClick={() => playCard('descPile2')}>
          
          {piles.descPile2.length > 0 && (
            <Card key={piles.descPile2[piles.descPile2.length - 1]} value={piles.descPile2[piles.descPile2.length - 1]} />
          )}
        </div>
      </div>
      {/* Player's Hand */}
      <div id="player-hand"> {/* ID for player hand */}
      <span>
            {invalidMoveMessage && <div className="invalid-move-message">{invalidMoveMessage}</div>}    
        </span>
        <h2>Your Hand</h2>
        <div className="hand"> {/* Class for hand */}
          {hand.map((card) => (
            <Card
              key={card}
              value={card}
              onClick={() => handleCardClick(card)}
              isSelected={selectedCard === card}
            />
          ))}
        </div>
        {/* Draw Card Button */}
        <button
        className='draw-card-button'
          onClick={() => drawCards()}
          disabled={deck.length === 0 || hand.length === 8 || cardsPlayedSinceDraw < 2}
        >
          <span className="deck-count">{deck.length}</span>
          {hand.length === 8 ? 'Cards ' : 'Draw'}
        </button>
        <button onClick={orderHand}>Reorder Hand</button>
        <button onClick={resetGame}>Reset Game</button>
        <button onClick={undoMove} disabled={gameHistory.length === 0}>
          Undo
        </button>
        {noMovesMessage && <div className="no-moves-message">{noMovesMessage}</div>}
      </div>
    </div>
  );
};

export default Game;
