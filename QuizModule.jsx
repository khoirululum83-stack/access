import React, { useState } from 'react';

export default function QuizModule({ questions, onSubmitAnswers }) {
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleSelectAnswer = (qId, val) => {
    setAnswers({ ...answers, [qId]: val });
  };

  const currentQ = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-lg">Soal {currentStep + 1} dari 40</span>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm uppercase">
          Tipe: {currentQ.type}
        </span>
      </div>

      <p className="text-gray-800 text-lg mb-6">{currentQ.question}</p>

      {/* Soal Pilihan Ganda (25 Soal) */}
      {currentQ.type === 'pg' && (
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectAnswer(currentQ.id, opt)}
              className={`w-full text-left p-3 border rounded-lg hover:bg-gray-50 ${
                answers[currentQ.id] === opt ? 'bg-red-100 border-red-500 font-bold' : ''
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Soal Benar / Salah (10 Soal) */}
      {currentQ.type === 'bs' && (
        <div className="flex gap-4">
          {['Benar', 'Salah'].map((val) => (
            <button
              key={val}
              onClick={() => handleSelectAnswer(currentQ.id, val)}
              className={`flex-1 p-4 border rounded-lg text-center font-bold ${
                answers[currentQ.id] === val ? 'bg-green-100 border-green-500' : ''
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      )}

      {/* Soal Essay (5 Soal) */}
      {currentQ.type === 'essay' && (
        <textarea
          rows={4}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
          placeholder="Tuliskan jawaban penjelasan Anda di sini..."
          value={answers[currentQ.id] || ''}
          onChange={(e) => handleSelectAnswer(currentQ.id, e.target.value)}
        />
      )}

      {/* Navigasi Soal */}
      <div className="flex justify-between mt-8">
        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((prev) => prev - 1)}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Sebelumnya
        </button>
        
        {currentStep < 39 ? (
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Selanjutnya
          </button>
        ) : (
          <button
            onClick={() => onSubmitAnswers(answers)}
            className="px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
          >
            Kirim Semua Jawaban
          </button>
        )}
      </div>
    </div>
  );
}