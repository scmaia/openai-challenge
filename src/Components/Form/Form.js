// import './Form.scss';
import Button from '../Button/Button';
import {useState} from 'react';

function Form ({ handleSubmit }) {

    const [prompt, setPrompt] = useState('');
    const [mood, setMood] = useState('neutral');

    const handlePromptChange = (event) => {
        setMood(event.target.value)
    };

    const handleMoodChange = (event) => {
        setMood(event.target.value)
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        handleSubmit(prompt);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor='mood'> Select AI's mood</label>
            <select className='form__field' name="mood" value={mood} onChange={handleMoodChange}>
                <option value="neutral">Neutral</option>
                <option value="depressed">Depressed</option>
                <option value="flirty">Flirty</option>
            </select>
            <label htmlFor='prompt'>Enter prompt </label>
            <input className='form__field' type='text' name='prompt' value={prompt} onChange={handlePromptChange} />
            <div className="form__buttons">
                <Button text="Submit Order" onClick={handleSubmitForm}/>
            </div>
        </form>
    );
};

export default Form;