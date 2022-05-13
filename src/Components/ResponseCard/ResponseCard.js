// import './ResponseCard.scss';

function ResponseCard ({ prompt, response, mood, timestamp }) {

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