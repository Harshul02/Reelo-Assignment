const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const app = express();
app.use(bodyParser.json());


const QuestionRoute = require('./routes/addQuestionRoute');
const GenerateRoute = require('./routes/generateQuestionPaperRoute');

app.use('/api/questions/', QuestionRoute);
app.use('/api/paper/', GenerateRoute);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
