// import './Form.scss';
import Button from '../Button/Button';
import {useState} from 'react';

function Form ({ handleRequest }) {

    const [prompt, setPrompt] = useState('');
    const [mood, setMood] = useState('neutral');

    const handlePromptChange = (event) => {
        setPrompt(event.target.value)
    };

    const handleMoodChange = (event) => {
        setMood(event.target.value)
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        const formattedData = {
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
           };
        setPrompt('');
        handleRequest(formattedData, prompt, mood);
    };

    return (
        <form className="form" onSubmit={handleSubmitForm}>
            <label htmlFor='mood'> Select AI's mood</label>
            <select className='form__field' name="mood" value={mood} onChange={handleMoodChange}>
                <option value="neutral">Neutral</option>
                <option value="depressed">Depressed</option>
                <option value="flirty">Flirty</option>
            </select>
            <label htmlFor='prompt'>Enter prompt </label>
            <input className='form__field' type='text' name='prompt' value={prompt} onChange={handlePromptChange} />
            <div className="form__buttons">
                <Button text="Submit" type='submit'/>
            </div>
        </form>
    );
};

export default Form;