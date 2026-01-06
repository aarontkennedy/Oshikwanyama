import { MultipleChoiceQuestion, Question } from "../../../types/types";
import "./MultipleChoice.scss";

const MultipleChoice = ({
  question,
  isCorrect,
  setIsCorrect,
  streak,
  setStreak,
  score,
  setScore,
  selectedOption,
  setSelectedOption,
  getCurrentQuestion,
}: {
  question: MultipleChoiceQuestion;
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
  console.log(`MultipleChoice ${isCorrect}`);

  const checkAnswer = (selected: string) => {
    setSelectedOption(selected);
    const currentQ = getCurrentQuestion() as MultipleChoiceQuestion;

    if (currentQ.type !== "multiple-choice") {
      throw Error(
        `Multiple choice component: unexpected question type ${currentQ.type}`
      );
    }
    const correct = selected === currentQ.correct;
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
    <div className="multiple-choice">
      {question.options.map((option, i) => (
        <button
          key={i}
          onClick={() => checkAnswer(option)}
          disabled={isCorrect !== null}
          className={`${
            selectedOption === option
              ? isCorrect
                ? "multiple-choice__correct"
                : "multiple-choice__incorrect"
              : ""
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoice;
