import { useState } from "react";
import { FillInTheBlankQuestion, Question } from "../../../types/types";
import "./FillInTheBlank.scss";

const FillInTheBlank = ({
  question,
  isCorrect,
  setIsCorrect,
  streak,
  setStreak,
  score,
  setScore,
  // selectedOption,
  setSelectedOption,
  getCurrentQuestion,
}: {
  question: FillInTheBlankQuestion;
  isCorrect: boolean | null;
  setIsCorrect: (c: boolean | null) => void;
  streak: number;
  setStreak: (n: number) => void;
  score: number;
  setScore: (n: number) => void;
  selectedOption: any;
  setSelectedOption: (selected: string) => void;
  getCurrentQuestion: () => Question;
}): JSX.Element => {
  const [answer, setAnswer] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const checkAnswer = () => {
    setSelectedOption(answer);
    const currentQ = getCurrentQuestion() as FillInTheBlankQuestion;

    if (currentQ.type !== "fill-blank") {
      throw Error(
        `FillInTheBlank component: unexpected question type ${currentQ.type}`
      );
    }
    const correct = answer.toLowerCase() === currentQ.answer.toLowerCase();
    setIsCorrect(correct);
    console.log(`checkAnswer() isCorrect = ${isCorrect}`);

    if (correct) {
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="fill-in-the-blank">
      <div className="fill-in-the-blank__input-wrapper">
        <input
          type="text"
          placeholder="Type your answer..."
          className="fill-in-the-blank__input"
          onChange={handleInputChange}
        />
        <button className="fill-in-the-blank__submit" onClick={checkAnswer}>
          Check
        </button>
      </div>

      {question.hint && isCorrect === null && (
        <div className="fill-in-the-blank__hint-wrapper">
          <div className="fill-in-the-blank__hint-label">Hint</div>
          <div className="fill-in-the-blank__hint">{question.hint}</div>
        </div>
      )}
    </div>
  );
};

export default FillInTheBlank;
