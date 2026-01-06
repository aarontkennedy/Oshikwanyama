// import "./LessonSelection.scss";
import VocabTable from "../components/VocabTable/VocabTable";
import ExampleDialogTable from "../components/ExampleDialogTable/ExampleDialogTable";
import PageTitle from "../components/PageTitle";
import { useState } from "react";
import LessonCtas from "../components/LessonCtas/LessonCtas";
import Quiz from "../components/Quiz/Quiz";
import { Question } from "../types/types";

const greetingsVocab = [
  { English: "Good", Oshikwanyama: "Nawa" },
  { English: "Morning", Oshikwanyama: "Ongula" },
  { English: "Afternoon (mid-day heat)", Oshikwanyama: "Omutenya" },
  { English: "Afternoon (late afternoon)", Oshikwanyama: "Komatango" },
  { English: "Evening", Oshikwanyama: "Onguloshi" },
  { English: "Night", Oshikwanyama: "Oufiku" },
  { English: "Friends", Oshikwanyama: "ooKaume" },
  { English: "Yes", Oshikwanyama: "Ehee / Ee / Heeno" },
  { English: "No", Oshikwanyama: "Ahowe / Aaye" },
  { English: "OK", Oshikwanyama: "Eewa" },
  { English: "Good morning", Oshikwanyama: "Wa lele po?" },
  { English: "Good afternoon", Oshikwanyama: "Wa uhala po?" },
  { English: "Good evening", Oshikwanyama: "Wa tokelwa po?" },
  {
    English: "Hello (and other informal greetings)",
    Oshikwanyama: "Ongaipi / Ongiini",
  },
  { English: "Go well", Oshikwanyama: "Enda po nawa" },
  { English: "Stay well", Oshikwanyama: "Kala po nawa" },
  {
    English: "Sleep well (someone leaving for bed)",
    Oshikwanyama: "Ka nangale po nawa",
  },
  {
    English: "Sleep well (someone you're leaving)",
    Oshikwanyama: "Nangala po nawa",
  },
];

const greetingsDialog = [
  {
    title: "Ongula",
    conversation: [
      "Tate: Wa lele po, Meme Liina?",
      "Meme: Ehee.",
      "Tate: Nawa tuu?",
      "Meme: Ehee. Ove wa lele po, Tate Petrus?",
      "Tate: Ehee.",
      "Meme: Nawa tuu?",
      "Tate: Ehee, onawa.",
    ],
  },
  {
    title: "Ongula",
    conversation: [
      "Tate: Kala po nawa, Meme Liina.",
      "Meme: Eewa, enda po nawa Tate Petrus.",
    ],
  },
  {
    title: "Komatango",
    conversation: [
      "Meme: Wa uhala po, Tate Landu?",
      "Tate: Ehee.",
      "Meme: Nawa tuu?",
      "Tate: Ehee. Ove wa uhala po, Meme Estera?",
      "Meme: Ehee.",
      "Tate: Nawa tuu?",
      "Meme: Ehee, onawa.",
    ],
  },
  {
    title: "Onguloshi",
    conversation: [
      "Meme: Wa tokelwa po, Tate Josefa?",
      "Tate: Ehee.",
      "Meme: Nawa tuu?",
      "Tate: Ehee. Ove wa tokelwa po, Meme Maria?",
      "Meme: Ehee.",
      "Tate: Nawa?",
      "Meme: Ehee, onawa.",
    ],
  },
  {
    title: "Ookaume",
    conversation: [
      "Beata: Ongaipi, Andreas?",
      "Andreas: Onawa, kaume. Ongaipi?",
      "Beata: Onawa.",
    ],
  },
];

const questions = [
  {
    type: "multiple-choice",
    prompt: "How do you say 'Hello' in Oshikwanyama?",
    options: ["Wa uhala po", "Ongipi", "Meme", "Tate"],
    correct: "Wa uhala po",
    explanation:
      "'Wa uhala po' is a common greeting in Oshikwanyama, similar to saying 'Hello' or 'How are you'",
  },
  {
    type: "multiple-choice",
    prompt: "What does 'Onawa' mean?",
    options: ["Goodbye", "Fine/Good", "Thank you", "Yes"],
    correct: "Fine/Good",
    explanation:
      "'Onawa' is used to respond when someone asks how you are, meaning 'I am fine' or 'I am good'",
  },
  {
    type: "matching",
    prompt: "Match the Oshikwanyama greeting with its meaning",
    pairs: [
      { word: "Wa uhala po", meaning: "Hello/How are you" },
      { word: "Ongipi", meaning: "What is your name" },
      { word: "Tangi", meaning: "Thank you" },
    ],
  },
];

const GreetingsLesson = () => {
  //   const {} = useContext(GameContext);
  //   const navigate = useNavigate();
  const [isQuizzing, setIsQuizzing] = useState(false);

  return (
    <>
      <PageTitle title="Greetings" translation="Greetings" />
      {!isQuizzing && (
        <div>
          <VocabTable vocab={greetingsVocab} />
          <ExampleDialogTable exampleDialogs={greetingsDialog} />
          <div>
            <LessonCtas setIsQuizzing={() => setIsQuizzing(true)} />
          </div>
        </div>
      )}

      {isQuizzing && <Quiz questions={questions as Question[]} />}
    </>
  );
};

export default GreetingsLesson;
