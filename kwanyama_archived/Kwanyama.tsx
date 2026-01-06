import Home from "./pages/home/Home";
import LessonSelection from "./pages/LessonSelection/LessonSelection";
// import QuizPage from "./components/Quiz/Quiz";
// import ProverbsLesson from "./pages/ProverbsLesson/ProverbsLesson";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import GreetingsLesson from "./pages/GreetingsLesson";

const Kwanyama = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="lessons" element={<LessonSelection />} />
        <Route path="greetings" element={<GreetingsLesson />} />
        {/*   <Route path="/lesson/" element={<Lesson />} />
          <Route path="/quiz/" element={<QuizPage />} />
          <Route path="/proverbs/" element={<ProverbsLesson />} /> */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Kwanyama;
