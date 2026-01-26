import { englishQuestions } from "@/data/englishQuestions";

export const exportEnglishQuestionsAsText = (): string => {
  let content = `SAT English Question Bank Export\n`;
  content += `Total Questions: ${englishQuestions.length}\n`;
  content += `Generated: ${new Date().toISOString()}\n`;
  content += `${"=".repeat(80)}\n\n`;

  englishQuestions.forEach((q, index) => {
    content += `Question ${index + 1} - ID: ${q.id}\n`;
    content += `Difficulty: ${q.difficulty} | Rating: ${q.difficultyRating || "N/A"} | Domain: ${q.domain} | Skill: ${q.skill}\n`;
    content += `${"-".repeat(60)}\n`;
    content += `${q.question}\n\n`;
    
    q.options.forEach(opt => {
      const isCorrect = opt.letter === q.correctAnswer;
      content += `  ${opt.letter}. ${opt.text}${isCorrect ? " ✓ CORRECT" : ""}\n`;
    });
    
    content += `\nCorrect Answer: ${q.correctAnswer}\n`;
    content += `Explanation: ${q.explanation}\n`;
    content += `\n${"=".repeat(80)}\n\n`;
  });

  return content;
};

// Auto-run and log when imported
const text = exportEnglishQuestionsAsText();
console.log(text);

// Also create downloadable blob
export const downloadEnglishQuestions = () => {
  const text = exportEnglishQuestionsAsText();
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `english-questions-${new Date().toISOString().split("T")[0]}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};
