import lessons from "@/data/oshikwanyama/lessons.json";
import type { Question } from "@/types/oshikwanyama";

/**
 * Gets exactly 10 questions for a lesson quiz.
 * If the lesson has fewer than 10 questions, supplements with random questions from previous lessons.
 * If the lesson has more than 10 questions, randomly selects 10 from that lesson.
 *
 * @param lessonId The ID of the lesson to get questions for
 * @returns An array of exactly 10 questions
 */
export function getQuizQuestions(lessonId: number): Question[] {
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) {
    throw new Error(`Lesson with id ${lessonId} not found`);
  }

  const lessonQuestions = [...lesson.questions];

  // If lesson has exactly 10 or fewer questions, supplement from previous lessons
  if (lessonQuestions.length <= 10) {
    const previousLessons = lessons.filter((l) => l.id < lessonId);
    const allPreviousQuestions: Question[] = [];

    // Collect all questions from previous lessons
    previousLessons.forEach((prevLesson) => {
      allPreviousQuestions.push(...prevLesson.questions);
    });

    // Shuffle previous questions and take what we need
    const shuffledPrevious = shuffleArray(allPreviousQuestions);
    const needed = 10 - lessonQuestions.length;

    // Add questions from previous lessons to reach 10 total
    const supplementalQuestions = shuffledPrevious.slice(0, needed);
    const allQuestions = [...lessonQuestions, ...supplementalQuestions];

    // Shuffle the final set
    return shuffleArray(allQuestions);
  }

  // If lesson has more than 10 questions, randomly select 10
  const shuffled = shuffleArray(lessonQuestions);
  return shuffled.slice(0, 10);
}

/**
 * Simple Fisher–Yates shuffle for arrays
 */
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
