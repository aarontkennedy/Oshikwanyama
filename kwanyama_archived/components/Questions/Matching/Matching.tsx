// import { useEffect, useState } from "react";
import { MatchingQuestion } from "../../../types/types";
import "./Matching.scss";

const Matching = ({}: // question,
{
  question: MatchingQuestion;
}): JSX.Element => {
  return <div></div>;
  // const [words, setWords] = useState([]);
  // const [meanings, setMeanings] = useState([]);
  // const [matches, setMatches] = useState([]);
  // const [draggingId, setDraggingId] = useState(null);
  // const [completed, setCompleted] = useState(false);
  // // Initialize the game
  // useEffect(() => {
  //   const shuffledWords = [...question.pairs].sort(() => Math.random() - 0.5);
  //   const shuffledMeanings = [...question.pairs]
  //     .sort(() => Math.random() - 0.5)
  //     .map((pair) => ({ id: pair.word, meaning: pair.meaning }));
  //   setWords(shuffledWords.map((pair) => ({ id: pair.word, word: pair.word })));
  //   setMeanings(shuffledMeanings);
  //   setMatches([]);
  // }, []);
  // // Check if the game is completed
  // useEffect(() => {
  //   if (matches.length === question.pairs.length) {
  //     setCompleted(true);
  //   }
  // }, [matches]);
  // // Handle the drag start
  // const handleDragStart = (e, id) => {
  //   setDraggingId(id);
  // };
  // // Handle the drop
  // const handleDrop = (e, meaningId) => {
  //   e.preventDefault();
  //   if (!draggingId) return;
  //   // Find the correct pair
  //   const correctPair = question.pairs.find((pair) => pair.word === draggingId);
  //   // Find the meaning object that was dropped on
  //   const targetMeaning = meanings.find((m) => m.id === meaningId);
  //   // Check if the match is correct
  //   if (correctPair.meaning === targetMeaning.meaning) {
  //     // Add to matches
  //     setMatches((prev) => [...prev, { word: draggingId, meaning: meaningId }]);
  //     // Remove the matched word from the list
  //     setWords((prev) => prev.filter((w) => w.id !== draggingId));
  //   }
  //   setDraggingId(null);
  // };
  // // Allow the drop
  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };
  // const meaningItemStyle = (isMatched: boolean) => ({
  //   padding: "12px",
  //   borderRadius: "4px",
  //   textAlign: "center",
  //   backgroundColor: isMatched ? "#e6ffe6" : "#fffbeb",
  //   border: isMatched ? "none" : "2px dashed #ffd699",
  //   minHeight: "40px",
  //   display: "flex",
  //   justifyContent: isMatched ? "space-between" : "center",
  //   alignItems: "center",
  // });
  // return (
  //   <div className="ordering__container">
  //     {/* Game area */}
  //     <div className="ordering__game-area">
  //       {/* Words column */}
  //       <div className="ordering__column">
  //         <h3 className="ordering__column-title">Words</h3>
  //         <div className="ordering__items-container">
  //           {words.map((item) => (
  //             <div
  //               key={item.id}
  //               draggable
  //               onDragStart={(e) => handleDragStart(e, item.id)}
  //               className="ordering__word-item"
  //               onMouseOver={(e) =>
  //                 (e.currentTarget.style.backgroundColor = "#cce0ff")
  //               }
  //               onMouseOut={(e) =>
  //                 (e.currentTarget.style.backgroundColor = "#e6f0ff")
  //               }
  //             >
  //               {item.word}
  //             </div>
  //           ))}
  //           {words.length === 0 && !completed && (
  //             <div className="ordering__empty-essage">All words matched!</div>
  //           )}
  //         </div>
  //       </div>
  //       {/* Meanings column */}
  //       <div className="ordering__column">
  //         <h3 className="ordering__column-title">Meanings</h3>
  //         <div className="ordering__items-container">
  //           {meanings.map((item) => {
  //             const isMatched = matches.some(
  //               (match) => match.meaning === item.id
  //             );
  //             const matchedWord = isMatched
  //               ? question.pairs.find(
  //                   (pair) =>
  //                     pair.word ===
  //                     matches.find((m) => m.meaning === item.id).word
  //                 ).word
  //               : null;
  //             return (
  //               <div
  //                 key={item.id}
  //                 onDragOver={handleDragOver}
  //                 onDrop={(e) => handleDrop(e, item.id)}
  //                 style={meaningItemStyle(isMatched)}
  //               >
  //                 {item.meaning}
  //                 {isMatched && (
  //                   <span className="ordering__matched-word-tag">
  //                     {matchedWord}
  //                   </span>
  //                 )}
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     </div>
  //     {/* Game status and controls */}
  //     <div className="ordering__status-container">
  //       {completed ? (
  //         <div style={{ marginBottom: "16px" }}>
  //           <div className="ordering__completed-message">
  //             Great job! You've matched all the words correctly!
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="ordering__progress">
  //           Drag the words to their correct meanings ({matches.length}/
  //           {question.pairs.length} matched)
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default Matching;
