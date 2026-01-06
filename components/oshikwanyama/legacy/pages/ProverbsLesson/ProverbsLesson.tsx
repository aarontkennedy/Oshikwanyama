import { useState } from "react";
import { default as proverbs } from "../../../../data/oshikwanyama/proverbs.json";
import { Section } from "@/types/oshikwanyama";
import PageTitle from "../../PageTitle";

const ProverbsLesson = ({
  // setSection,
  startQuiz,
}: {
  setSection: (section: Section) => void;
  startQuiz: (index: number) => void;
}) => {
  const [currentProverb, setCurrentProverb] = useState(0);

  const nextProverb = () => {
    setCurrentProverb((currentProverb + 1) % proverbs.length);
  };

  const prevProverb = () => {
    setCurrentProverb((currentProverb - 1 + proverbs.length) % proverbs.length);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <PageTitle
        title="Oshikwanyama Proverbs"
        translation="Oshikwanyama Proverbs"
      />

      <div className="bg-amber-50 p-6 rounded-lg shadow-lg mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">From "Omishe Di Dole Eyovi"</h2>
          <span className="text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
            {currentProverb + 1}/{proverbs.length}
          </span>
        </div>
        <div className="h-48 flex flex-col justify-center">
          <p className="text-2xl font-semibold text-amber-800 mb-2">
            {proverbs[currentProverb].original}
          </p>
          <p className="text-lg text-amber-700 italic mb-4">
            "{proverbs[currentProverb].translation}"
          </p>
          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <p className="text-gray-700">
              {proverbs[currentProverb].explanation}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={prevProverb}
            className="bg-amber-200 hover:bg-amber-300 text-amber-800 py-2 px-4 rounded-lg"
          >
            Previous
          </button>
          <button
            onClick={() => startQuiz(10)}
            className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg"
          >
            Practice Proverbs
          </button>
          <button
            onClick={nextProverb}
            className="bg-amber-200 hover:bg-amber-300 text-amber-800 py-2 px-4 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">About Kwanyama Proverbs</h2>
        <p className="text-gray-700 mb-3">
          Proverbs (ovitwa/omiano) are an essential part of Oshikwanyama oral
          tradition, carrying centuries of wisdom and cultural values.
        </p>
        <p className="text-gray-700 mb-3">
          "Omishe Di Dole Eyovi" is a collection of Oshikwanyama proverbs that
          preserves these important cultural expressions for future generations.
        </p>
        <p className="text-gray-700 mb-3">
          These sayings are often used in everyday conversation to provide
          guidance, resolve conflicts, and teach important life lessons.
        </p>
        <p className="text-gray-700">
          Learning these proverbs offers deeper insight into Ovakwanyama culture
          and worldview beyond just vocabulary and grammar.
        </p>
      </div>
    </div>
  );
};

export default ProverbsLesson;
