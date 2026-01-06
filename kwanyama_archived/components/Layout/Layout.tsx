import { useState } from "react";
import { GameContext } from "../../GameContext";
import "./Kwanyama.scss";
import namibiaFlagImage from "../../images/namibiaFlag.png";
import { Link, Outlet } from "react-router-dom";
import { kwanyamaUrl } from "../../helpers/urlHelper";

export const Layout = (): JSX.Element => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  return (
    <GameContext.Provider
      value={{
        score,
        setScore,
        streak,
        setStreak,
        completedLessons,
        setCompletedLessons,
      }}
    >
      <div className="kwanyama__container">
        <div className="kwanyama__header">
          <Link className="kwanyama__header--left" to={kwanyamaUrl("")}>
            <img className="kwanyama__header-image" src={namibiaFlagImage} />
            <div className="kwanyama__header-title-container">
              <div className="kwanyama__header-title">Kwafela!</div>
              <div className="kwanyama__header-sub-title">Welcome!</div>
            </div>
          </Link>
          <div className="kwanyama__header--right">
            <div className="kwanyama__header-score">
              <span className="kwanyama__header-score-label">Score</span>
              <span className="kwanyama__header-score-value">{score}</span>
            </div>
            <div className="kwanyama__header-score">
              <span className="kwanyama__header-score-label">
                Lessons Completed
              </span>
              <span className="kwanyama__header-score-value">
                {completedLessons.length}
              </span>
            </div>
          </div>
        </div>
        <div className="kwanyama__page">
          <div className="page">
            <Outlet />
          </div>
        </div>
        <div className="kwanyama__footer">
          <Link to="/">Aaron Kennedy &copy; 2024</Link>
        </div>
      </div>
    </GameContext.Provider>
  );
};
export default Layout;
