import './MoodSelector.scss';
import { Moods } from "../../pages/Main/Main";

interface IMoodSelectorProps {
    mood:string;
    handleMoodChange:(newMood:Moods) => void;
}

const MoodSelector:React.FC<IMoodSelectorProps> = ({ mood, handleMoodChange }) => {

    const handleInputChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        handleMoodChange(event.target.value as Moods)
    };

    return (
        <form className="mood">
            <p className="mood__header">Select mood:</p>
            <label htmlFor='mood' className="mood__select">
                <select className='mood__field' name="mood" value={mood} onChange={handleInputChange}>
                    {Object.entries(Moods).map(([key, value]) =>
                        <option value={value} key={key}>{key}</option>
                    )}
                </select>
            </label>
        </form>
    );
};

export default MoodSelector;