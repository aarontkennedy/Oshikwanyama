import { DragEvent, useEffect, useState } from "react";
import { OrderingQuestion } from "../../../types/types";
import "./Ordering.scss";

const Ordering = ({
  question,
}: {
  question: OrderingQuestion;
}): JSX.Element => {
  const [items, setItems] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Shuffle the items array
  const shuffleItems = () => {
    const shuffled = [...question.items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setIsCorrect(null);
  };

  // Initialize with randomized items
  useEffect(() => {
    shuffleItems();
  }, []);

  // Handle the start of dragging
  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  // Handle dragging over a different item
  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setDraggedOverIndex(index);
  };

  // Handle dropping an item
  const handleDrop = (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedItem !== null) {
      const newItems = [...items];
      const itemToMove = newItems[draggedItem];
      newItems.splice(draggedItem, 1);
      newItems.splice(dropIndex, 0, itemToMove);
      setItems(newItems);
      setDraggedItem(null);
      setDraggedOverIndex(null);
    }
  };

  // Check if the current order is correct
  const checkOrder = () => {
    const isOrderCorrect = items.every((item, index) => {
      return item === question.items[index];
    });
    setIsCorrect(isOrderCorrect);
  };

  const getItemStyle = (index: number) => {
    return {
      padding: "12px",
      margin: "8px 0",
      backgroundColor: draggedOverIndex === index ? "#e6f7ff" : "#f5f5f5",
      borderRadius: "6px",
      border: `2px solid ${draggedOverIndex === index ? "#1890ff" : "#e8e8e8"}`,
      cursor: "move",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      opacity: draggedItem === index ? 0.5 : 1,
    };
  };

  const getFeedbackStyle = () => {
    return {
      marginTop: "16px",
      padding: "12px",
      borderRadius: "6px",
      backgroundColor: isCorrect ? "#f6ffed" : "#fff2f0",
      color: isCorrect ? "#52c41a" : "#ff4d4f",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    };
  };

  return (
    <div className="ordering__container">
      <div className="ordering__items-container">
        {items.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            style={getItemStyle(index)}
          >
            <span style={{ fontWeight: "500" }}>{item}</span>
            <span className="ordering__item-number">{index + 1}</span>
          </div>
        ))}
      </div>

      <div className="ordering__button-container">
        <button onClick={checkOrder} className="ordering__check-button">
          Check Order
        </button>
      </div>

      {isCorrect !== null && (
        <div style={getFeedbackStyle()}>
          {isCorrect ? (
            <>
              <span style={{ fontSize: "18px" }}>✓</span>
              <span>Correct! Well done!</span>
            </>
          ) : (
            <>
              <span style={{ fontSize: "18px" }}>✗</span>
              <span>Not quite right. Try again!</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Ordering;
