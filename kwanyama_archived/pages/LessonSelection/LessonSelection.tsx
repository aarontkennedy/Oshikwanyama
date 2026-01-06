import { useContext } from "react";
// import ButtonWithTranslation from "../../components/ButtonWithTranslation/ButtonWithTranslation";
import PageTitle from "../../components/PageTitle";
import { GameContext } from "../../GameContext";
import "./LessonSelection.scss";
// import { useNavigate } from "react-router-dom";
// import { kwanyamaUrl } from "../../helpers/urlHelper";

// const lessons = [
//   {
//     path: "greetings",
//     title: "Greetings",
//     description: "Learn basic greetings in Oshikwanyama",
//   },
// ];

const LessonSelection = () => {
  const {} = useContext(GameContext);
  // const navigate = useNavigate();

  return (
    <>
      <PageTitle
        title="Oshikwanyama Lessons"
        translation="Oshikwanyama Lessons"
      />

      <div className="lesson-selection">
        {/* {lessons.map((lesson, index) => (
          <div
            key={lesson.path}
            // className={`lesson ${
            //   completedLessons.includes(lesson.id)
            //     ? "lesson__border--completed"
            //     : "lesson__border"
            // } ${lesson.id === 11 ? "" : ""}`}
          >
            <div className="lesson-top">
              <h2
                className="lesson__title"
                onClick={() => {
                  navigate(kwanyamaUrl(lesson.path));
                }}
              >
                {lesson.title}
              </h2>
              <p className="lesson__description">{lesson.description}</p>
            </div>
            <div className="lesson-bottom">
              <div className="lesson__cta-wrapper">
                <ButtonWithTranslation
                  cta={
                    "Start"
                    // completedLessons.includes(lesson.id) ? "Practice" : "Start"
                  }
                  translated={
                    "Start"
                    // completedLessons.includes(lesson.id) ? "Practice" : "Start"
                  }
                  onClickHandler={() => {
                    navigate(kwanyamaUrl(lesson.path));
                  }}
                  // className={`lesson__cta ${
                  //   lesson.id === 11
                  //     ? ""
                  //     : completedLessons.includes(lesson.id)
                  //     ? ""
                  //     : ""
                  // }`}
                />
              </div>
              <div className="lesson__excercises">
                {lesson.questions.length} exercises
              </div>
            </div>
        </div>
        ))} */}
      </div>
    </>
  );
};

export default LessonSelection;
