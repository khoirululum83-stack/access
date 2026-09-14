const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentName: String,
  scorePG_BS: Number, // Otomatis terhitung (max 35 soal)
  essayAnswers: [{ questionId: Number, answer: String }],
  essayScores: [{ questionId: Number, score: Number }], // Diisi oleh Guru
  finalScore: Number, // Calculated: Score PG_BS + Total Score Essay
  status: { type: String, enum: ['Pending', 'Graded'], default: 'Pending' },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);