import { useNavigate } from "react-router-dom";
import ButtonWithTranslation from "../ButtonWithTranslation/ButtonWithTranslation";
import { kwanyamaUrl } from "../../helpers/urlHelper";

const LessonCtas = ({
  setIsQuizzing,
}: {
  setIsQuizzing: () => void;
}): JSX.Element | null => {
  const navigate = useNavigate();

  return (
    <div className="lesson-ctas__wrapper">
      <ButtonWithTranslation
        cta="Exit Lesson"
        translated="Exit Lesson"
        onClickHandler={() => navigate(kwanyamaUrl("lessons"))}
      />

      <ButtonWithTranslation
        cta="Start"
        translated="Start"
        onClickHandler={setIsQuizzing}
      />
    </div>
  );
};

export default LessonCtas;
