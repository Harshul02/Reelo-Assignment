const express = require("express");
const router = express.Router();
const Question = require("../model/questionModel");

router.post('/add', async (req, res) => {
    try {
      const { question, subject, topic, difficulty, marks } = req.body;
  
      // Validate the incoming data
      const newQuestion = new Question({ question, subject, topic, difficulty, marks });
  
      // Save the question to the database
      await newQuestion.save();
  
      res.json({ success: true, message: 'Question added successfully', question: newQuestion });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  module.exports = router;