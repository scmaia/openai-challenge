import './Form.scss';
import Button from '../Button/Button';
import React, {useState} from 'react';

interface IFormProps {
    handleRequest:(returnPrompt:string) => void;
}

const Form:React.FC<IFormProps> = ({ handleRequest }) => {

    const [prompt, setPrompt] = useState('');

    const handlePromptChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(event.target.value)
    };

    const handleSubmitForm = (event:React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const returnPrompt = prompt;
        setPrompt('');
        handleRequest(returnPrompt);
    };

    return (
        <form className="form" onSubmit={handleSubmitForm}>
            <label htmlFor='prompt' className="form__label">Enter prompt </label>
            <textarea className='form__field' rows={4} name='prompt' value={prompt} onChange={handlePromptChange} />
            <div className="form__buttons">
                <Button text="Submit" type='submit'/>
            </div>
        </form>
    );
};

export default Form;