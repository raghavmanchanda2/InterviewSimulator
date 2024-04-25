// QuizQuestion.js
import React from 'react';

function QuizQuestion({ question, onDelete, onEdit }) {
    return (
        <div className="card" style={{marginBottom: '20px',}}>
            <div className="card-body">
                <h5 className="card-title">{question.question}</h5>
                <p className="card-text">Section: {question.section}</p>
                {question.timeLimit && <p className="card-text">Time Limit: {question.timeLimit} seconds</p>}

                <button className="btn btn-danger mr-2" onClick={() => onDelete(question)}>Delete</button>
            </div>
        </div>
    );
}

export default QuizQuestion;
