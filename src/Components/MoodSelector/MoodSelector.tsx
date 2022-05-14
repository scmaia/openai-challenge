// import './MoodSelector.scss';
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
            <label htmlFor='mood'> Select AI's mood</label>
            <select className='mood__field' name="mood" value={mood} onChange={handleInputChange}>
                {Object.entries(Moods).map(([key, value]) =>
                    <option value={value} key={key}>{key}</option>
                )}
            </select>
        </form>
    );
};

export default MoodSelector;