const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../model/questionModel');

// Route to generate a question paper
router.get('/generate', async (req, res) => {
  const { totalMarks, difficultyDistribution } = req.body;

  try {
    // Validate input
    if (!totalMarks || !difficultyDistribution) {
      throw new Error('Invalid input. Both totalMarks and difficultyDistribution are required.');
    }

    const questionPaper = await generateQuestionPaper(totalMarks, difficultyDistribution);
    res.json({ success: true, questionPaper });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  async function generateQuestionPaper(totalMarks, difficultyDistribution) {
    try {
      const questionPaper = [];
      const difficulties = Object.keys(difficultyDistribution);
  
      for (const difficulty of difficulties) {
        const marks = getMarksForDifficulty(difficulty);
        const count = Math.round((difficultyDistribution[difficulty] / 100) * totalMarks)/marks;
  
        // Fetch all questions from the database for the given difficulty
        const allQuestions = await Question.find({ difficulty });
  
        // Shuffle the questions array
        shuffleArray(allQuestions);
  
        // Take a random subset of questions based on the count
        const selectedQuestions = allQuestions.slice(0, count);
  
        // Add questions to the paper
        for (const question of selectedQuestions) {
          // Ensure the total marks of the paper does not exceed the required totalMarks
          if (questionPaper.reduce((acc, q) => acc + q.marks, 0) + marks <= totalMarks) {
            questionPaper.push({ ...question.toObject(), marks });
          }
        }
      }
  
      return questionPaper;
    } catch (error) {
      throw new Error(`Error generating question paper: ${error.message}`);
    }
  }

// Helper function to get marks based on difficulty
function getMarksForDifficulty(difficulty) {
  switch (difficulty) {
    case 'Easy':
      return 1;
    case 'Medium':
      return 5;
    case 'Hard':
      return 10;
    default:
      return 0;
  }
}

module.exports = router;
