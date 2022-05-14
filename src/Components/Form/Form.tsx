// import './Form.scss';
import Button from '../Button/Button';
import React, {useState} from 'react';

interface IFormProps {
    handleRequest:(data:object, prompt:string, mood:string) => void;
    mood:string;
}

const Form:React.FC<IFormProps> = ({ handleRequest, mood }) => {

    const [prompt, setPrompt] = useState('');

    const handlePromptChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(event.target.value)
    };

    const handleSubmitForm = (event:React.ChangeEvent<HTMLFormElement>) => {
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
            <label htmlFor='prompt'>Enter prompt </label>
            <input className='form__field' type='text' name='prompt' value={prompt} onChange={handlePromptChange} />
            <div className="form__buttons">
                <Button text="Submit" type='submit'/>
            </div>
        </form>
    );
};

export default Form;