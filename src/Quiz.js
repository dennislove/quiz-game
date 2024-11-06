import React, {  useState } from 'react';
import questionData from './localization.json';

function Quiz() {
    const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);

    // Dữ liệu câu hỏi từ JSON
    const question = questionData[0];

    // Xử lý chọn đáp án
    const handleSelectAnswer = (answer) => {
        setSelectedAnswer(answer);
        // Kiểm tra đáp án
        if (answer === question.answer) {
            setResult("Bạn đã chọn đúng!");
        } else {
            setResult("Bạn đã chọn sai!");
        }
    };
    const handleNext = () => {
        if (currentIndex < questionData.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setSelectedAnswer(null);
          setResult(null);
        }
      };
    
      const handlePrev = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setSelectedAnswer(null);
          setResult(null);
        }
      };
    
      const currentQuestion = questionData[currentIndex];

    return (
        <div>
            <h2>{currentQuestion.question}</h2>
            <div>
                {Object.keys(currentQuestion).filter(key => key.match(/^[1-4]$/)).map((key) => (
                    <div
                        key={key}
                        className={`answer ${selectedAnswer === key ? (key === currentQuestion.answer ? 'correct' : 'incorrect') : ''}`}
                        onClick={() => handleSelectAnswer(key)}
                        style={{ padding: '10px', border: '1px solid #ccc', margin: '5px 0', cursor: 'pointer' }}
                    >
                        {currentQuestion[key]}
                    </div>
                ))}
                 <button onClick={handlePrev} disabled={currentIndex === 0}>Prev</button>
                 <button onClick={handleNext} disabled={currentIndex === questionData.length - 1}>Next</button>
            </div>
            {result && <div>{result}</div>}
        </div>
  );
}

export default Quiz;
