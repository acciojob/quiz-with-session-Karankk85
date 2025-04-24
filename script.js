const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

// Load progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || [];

function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear before rendering

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.innerText = q.question;
    questionDiv.appendChild(questionText);

    for (let j = 0; j < q.choices.length; j++) {
      const choice = q.choices[j];
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore saved progress
      if (progress[i] === choice) {
        input.setAttribute("checked", "true"); // For Cypress test compatibility
      }

      // Save progress when selected
      input.addEventListener("change", () => {
        progress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      const label = document.createTextNode(choice);
      questionDiv.appendChild(input);
      questionDiv.appendChild(label);
    }

    questionsElement.appendChild(questionDiv);
  }
}

submitButton.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (progress[i] === questions[i].answer) {
      score++;
    }
  }

  const scoreText = `Your score is ${score} out of 5.`;
  scoreElement.innerText = scoreText;

  localStorage.setItem("score", score.toString());
});

renderQuestions();

// Show score if already submitted (page refreshed after submission)
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.innerText = `Your score is ${savedScore} out of 5.`;
}
