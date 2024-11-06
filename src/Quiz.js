import React, { useState } from 'react';
import questionData from './localization.json';

function Quiz() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [result, setResult] = useState(null);

    // Dữ liệu câu hỏi từ JSON
    const question = questionData[currentIndex];

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

    return (
        <div>
            <h2>{question.question}</h2>
            <div>
                {Object.keys(question)
                    .filter(key => key.match(/^[1-5]$/)) // Filter to only include answers 1-5
                    .map((key) => (
                        <div
                            key={key}
                            className={`answer ${selectedAnswer === key ? (key === question.answer ? 'correct' : 'incorrect') : ''}`}
                            onClick={() => handleSelectAnswer(key)}
                            style={{
                              padding: '10px',
                              border: '1px solid #ccc',
                              margin: '5px 0',
                              cursor: 'pointer',
                              backgroundColor: selectedAnswer === key 
                                  ? (key === question.answer ? 'lightgreen' : 'lightcoral') 
                                  : ''
                          }}
                        >
                            {question[key]}
                        </div>
                    ))}
                <div>
                    <button onClick={handlePrev} disabled={currentIndex === 0} style={{
        padding: '10px 20px', 
        backgroundColor: '#333', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer', 
        fontSize: '16px'
    }}>Lui về</button>
                    <button onClick={handleNext} disabled={currentIndex === questionData.length - 1} style={{
        padding: '10px 20px', 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer', 
        fontSize: '16px',
        marginLeft:'8px'
    }}>Tiếp theo</button>
                </div>
            </div>
            
        </div>
    );
}

export default Quiz;
