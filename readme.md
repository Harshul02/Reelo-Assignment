# Question Paper Generator

This repository contains the implementation of a Question Paper Generator application, as per the provided coding assignment brief. The application is designed to generate question papers based on specified total marks and a distribution of marks for different difficulties.

## Features

- Generates a question paper based on a given total marks and difficulty distribution.
- Handles edge cases, such as not enough questions in the question store, not enough questions of a specific difficulty, marks of the questions don't add up exactly to the total marks, and the question store is empty.
- Uses the `nodemon` package for live reloading of the server during development.

## Getting Started

These instructions will get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have `Node.js` and `npm` installed on your machine.

### Installing

1. Clone the repository.
```
git clone https://github.com/Harshul02/Reelo-Assignment.git
```

2. Navigate to the project directory.
```
cd Reelo-Assignment
```
3. Install the dependencies
```
npm install mongoose express body-parser
```
4. Start the server
```
nodemon index.js
```
If you don't have `nodemon`, then use
```
node index.js
```

## Handling Edge Cases

The implementation of the question paper generator may not always generate a question paper with the exact total marks. This could happen if there are not enough questions in the question store or if the marks of the questions don't add up exactly to the total marks. Here's how the application handles these edge cases:

1. **Enough questions in the question store:** If there are enough questions in the question store to fulfill the total marks. <br>
`
if (questionPaper.reduce((acc, q) => acc + q.marks, 0) + marks <= totalMarks) {
            questionPaper.push({ ...question.toObject(), marks });
}
`

## Testing

- To add questions to the database <br>
Sample Data
```
{
"question": "What is Biology?",
"subject": "Biology",
"topic": "General",
"difficulty": "Easy",
"marks": 1
}
```
command
```
curl -X POST -H "Content-Type: application/json" -d '{"question": "What is Biology?", "subject": "Biology", "topic": "General", "difficulty": "Easy", "marks": 1}' http://localhost:3000/api/questions/add
```

- To generate a question paper <br>
Sample data
```
{
"totalMarks": 100,
"difficultyDistribution": {
  "Easy": 20,
  "Medium": 40,
  "Hard": 40
  }
}
```
command
```
curl -X GET -H "Content-Type: application/json" -d '{"totalMarks": 50, "difficultyDistribution": {"Easy": 20, "Medium": 40, "Hard": 40}}' http://localhost:3000/api/paper/generate
```
