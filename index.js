const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// 1. Tambahkan import Model Result
const Result = require('./models/Result'); 

const app = express();

app.use(cors());
app.use(express.json());

// 2. Koneksi Database (tanpa opsi deprecated)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Route Penilaian oleh Guru (Update Essay Score)
app.post('/api/guru/grade-essay', async (req, res) => {
  const { resultId, essayScores } = req.body; 

  // Validasi payload dasar
  if (!resultId || !Array.isArray(essayScores)) {
    return res.status(400).json({ error: 'resultId dan array essayScores wajib diisi.' });
  }

  try {
    const result = await Result.findById(resultId);
    
    // 3. Cek apakah data result ditemukan
    if (!result) {
      return res.status(404).json({ error: 'Data hasil ujian tidak ditemukan.' });
    }

    // 4. Hitung total skor essay menggunakan reduce
    const totalEssayScore = essayScores.reduce((acc, item) => acc + (Number(item.score) || 0), 0);

    // Update data
    result.essayScores = essayScores;
    result.finalScore = (result.scorePG_BS || 0) + totalEssayScore;
    result.status = 'Graded';

    await result.save();

    return res.json({ 
      message: "Penilaian berhasil disimpan!", 
      result 
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = app; // Di-export untuk Vercel Serverless
