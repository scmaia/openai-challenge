// import './ResponseCard.scss';

interface IRespondeCardProps {
    prompt:string;
    response:string;
    mood:string;
    favorite: boolean;
    timestamp:number
}

const ResponseCard:React.FC<IRespondeCardProps> = ({ prompt, response, mood, favorite, timestamp }) => {

    return (
        <div className="response">
            <p>mood of response: {mood}</p>
            <p>prompt: {prompt}</p>
            <p>response: {response}</p>
            <p>timestamp: {new Date(timestamp).toDateString()}</p>
        </div>
    );
};

export default ResponseCard;