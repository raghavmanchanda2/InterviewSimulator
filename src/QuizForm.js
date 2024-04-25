// QuizForm.js
import React, {useEffect, useState} from 'react';

function QuizForm({ onSubmit, editMode, editQuestion }) {
    const [question, setQuestion] = useState('');
    const [section, setSection] = useState('video');
    const [timeLimit, setTimeLimit] = useState('');

    // Set initial values when in edit mode
    useEffect(() => {
        if (editMode && editQuestion) {
            setQuestion(editQuestion.question);
            setSection(editQuestion.section);
            setTimeLimit(editQuestion.timeLimit || ''); // If timeLimit is not provided, set it to an empty string
        }
    }, [editMode, editQuestion]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ question, section, timeLimit });
        setQuestion('');
        setSection('video');
        setTimeLimit('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="question">Question</label>
                <input
                    type="text"
                    className="form-control"
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="section">Section</label>
                <select
                    className="form-control"
                    id="section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                >
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                    <option value="text">Text</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="timeLimit">Time Limit (in minutes)</label>
                <input
                    type="number"
                    className="form-control"
                    id="timeLimit"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                />
            </div>
            <button type="submit" style={{marginTop:'10px'}} className="btn btn-primary">{editMode ? 'Save Changes' : 'Add Question'}</button>
        </form>
    );
}

export default QuizForm;
