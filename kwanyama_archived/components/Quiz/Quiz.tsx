import {
  // FillInTheBlankQuestion,
  // MatchingQuestion,
  // MultipleChoiceQuestion,
  // OrderingQuestion,
  Question,
  // Section,
} from "../../types/types";
import "./Quiz.scss";
// import FillInTheBlank from "../Questions/FillInTheBlank/FillInTheBlank";
// import Ordering from "../Questions/Ordering/Ordering";
// import Matching from "../Questions/Matching/Matching";
// import MultipleChoice from "../Questions/MultipleChoice/MultipleChoice";
// import ButtonWithTranslation from "../ButtonWithTranslation/ButtonWithTranslation";
// import { useState } from "react";
// import { GameContext } from "../../GameContext";
// import { useNavigate } from "react-router-dom";
// import { kwanyamaUrl } from "../../helpers/urlHelper";

const Quiz = ({}: { questions: Question[] }): JSX.Element | null => {
  // const {
  //   score,
  //   setScore,
  //   streak,
  //   setStreak,
  //   // completedLessons,
  //   // setCompletedLessons,
  // } = useContext(GameContext);
  // const navigate = useNavigate();
  // if (currentLesson === null) return null;
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  // const [selectedOption, setSelectedOption] = useState(null);

  // const getCurrentQuestion = (): Question => {
  //   return questions[currentQuestion];
  // };

  // const nextQuestion = () => {
  //   console.log(`nextQuestion()`);

  //   if (currentQuestion < questions.length - 1) {
  //     setCurrentQuestion((prev) => prev++);
  //     // setSelectedOption(null);
  //     // setIsCorrect(null);
  //   } else {
  //     // Lesson complete
  //     // if (!completedLessons.includes(lessons[currentLesson].id)) {
  //     //   setCompletedLessons([...completedLessons, lessons[currentLesson].id]);
  //     // }

  //     navigate(kwanyamaUrl("lessons"));
  //   }
  // };

  // const question = questions[currentQuestion];

  return (
    <>
      <div className="quiz-page__question-tracker">
        {/* Question {currentQuestion + 1} of {questions.length} */}
      </div>

      <div className="question">
        {/* <h2 className="question__prompt">{question.prompt}</h2> */}

        {/* {question.type === "multiple-choice" && (
          <MultipleChoice
            question={question as MultipleChoiceQuestion}
            isCorrect={isCorrect}
            setIsCorrect={setIsCorrect}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            streak={streak}
            setStreak={setStreak}
            score={score}
            setScore={setScore}
            getCurrentQuestion={getCurrentQuestion}
          />
        )} */}
        {/* 
        {question.type === "matching" && (
          <Matching question={question as MatchingQuestion} />
        )}

        {question.type === "fill-blank" && (
          <FillInTheBlank
            question={question as FillInTheBlankQuestion}
            isCorrect={isCorrect}
            setIsCorrect={setIsCorrect}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            streak={streak}
            setStreak={setStreak}
            score={score}
            setScore={setScore}
            getCurrentQuestion={getCurrentQuestion}
          />
        )}

        {question.type === "ordering" && (
          <Ordering question={question as OrderingQuestion} />
        )} */}
      </div>
      {/* 
      {isCorrect !== null && (
        <div className="quiz-page__question-result-wrapper">
          <p className={`  ${isCorrect ? "" : ""}`}>
            {isCorrect ? "Excellent!" : "Not quite right."}{" "}
            {question.explanation}
          </p>
        </div>
      )} */}

      {/* <div className="quiz-page__navigation-wrapper">
        <ButtonWithTranslation
          cta="Exit Lesson"
          translated="Exit Lesson"
          onClickHandler={() => setSection("lessons")}
        />

        <ButtonWithTranslation
          cta={
            currentQuestion < lessonData.questions.length - 1
              ? "Next Question"
              : "Complete Lesson"
          }
          translated={
            currentQuestion < lessonData.questions.length - 1
              ? "Next Question"
              : "Complete Lesson"
          }
          onClickHandler={nextQuestion}
          disabled={isCorrect === null}
        />
      </div> */}
    </>
  );
};

export default Quiz;
