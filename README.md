# CompTIA Security+ (SY0-701) Practice Exam

A lightweight, interactive web application to help you prepare for the CompTIA Security+ (SY0-701) certification exam. Test your knowledge across the five SY0-701 domains with randomized questions, instant feedback, and score tracking.

## Live Demo

Click [here](https://anomalous55.github.io/CompTIA-SecPlus-Practice-Exam/) to take the practice exam!

## Project Structure

CompTIA-Sec-Practice-Exam/
├── index.html       # The main structure and UI of the quiz
├── style.css        # Styling and layout
├── script.js        # The quiz logic, state management, and scoring
├── questions.json   # The database of questions and answers
└── README.md        # Project documentation


## Local Development

If you want to run this project locally on your computer, you need to use a local web server. Opening index.html directly in your browser (using the file:// protocol) will block the fetch('questions.json') request due to standard browser CORS security policies.

Method 1: VS Code (Recommended)

Install the Live Server extension in Visual Studio Code.

Open index.html and click "Go Live" in the bottom right corner.

Method 2: Python
If you have Python installed, open your terminal in the project folder and run:

# For Python 3
python -m http.server 8000


Then open http://localhost:8000 in your web browser.

## How to Add More Questions

To expand your study pool, simply open questions.json and add new objects to the array. Make sure you follow this exact format:

{
  "id": 4,
  "domain": "3.0 Architecture and Design",
  "question": "Your new question text goes here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "Option B",
  "explanation": "This explains why Option B is the correct choice, helping you study."
}


Tip: Ensure the string in "answer" exactly matches one of the strings in the "options" array!

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page. If you have a great batch of SY0-701 questions to add to the pool, feel free to fork this repository and submit a Pull Request.

## License

This project is open source and available under the MIT License.
