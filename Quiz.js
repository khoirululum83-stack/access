const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: Number,
  type: { type: String, enum: ['pg', 'bs', 'essay'], required: true },
  question: { type: String, required: true },
  options: [String], // Khusus pilihan ganda (4 pilihan)
  correctAnswer: String, // Untuk PG (misal: "A") atau BS (misal: "Benar")
});

const quizSchema = new mongoose.Schema({
  title: { type: String, default: "Ujian Dasar Microsoft Access" },
  questions: [questionSchema] // Total 40 soal
});

module.exports = mongoose.model('Quiz', quizSchema);