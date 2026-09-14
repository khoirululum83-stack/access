const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Route Penilaian oleh Guru (Update Essay Score)
app.post('/api/guru/grade-essay', async (req, res) => {
  const { resultId, essayScores } = req.body; 
  // essayScores = [{ questionId: 36, score: 10 }, ...]
  
  try {
    const result = await Result.findById(resultId);
    let totalEssayScore = 0;
    
    essayScores.forEach(item => {
      totalEssayScore += item.score;
    });

    result.essayScores = essayScores;
    result.finalScore = result.scorePG_BS + totalEssayScore;
    result.status = 'Graded';
    
    await result.save();
    res.json({ message: "Penilaian berhasil disimpan!", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app; // Di-export untuk Vercel Serverless