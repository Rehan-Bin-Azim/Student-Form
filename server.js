require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(process.env.MONGODB_URI ||'mongodb+srv://rehanbinazim17:BangladeshRehan@studentform.9o4hc4s.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected Successfully!!!!');  
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Schema matches form fields
const studentSchema = new mongoose.Schema({
  regNo: String,
  firstName: String,
  lastName: String,
  email: String,
  branch: String,
});
const Student = mongoose.model('Student', studentSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', async (req, res) => {
  const { regNo, firstName, lastName, email, branch } = req.body;
  const newStudent = new Student({ regNo, firstName, lastName, email, branch });
  try {
    await newStudent.save();
    res.status(200).send('Form submitted successfully!');
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).send('Error submitting form');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
