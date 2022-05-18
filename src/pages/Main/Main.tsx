import React, { useState, useEffect } from 'react';
import { apiRequest } from "../../utils/apiUtils";
import './Main.scss';
import Decoration from '../../Components/Decoration/Decoration';
import Header from '../../Components/Header/Header';
import MoodSelector from '../../Components/MoodSelector/MoodSelector';
import Form from '../../Components/Form/Form';
import Print from '../../Components/Print/Print';
import jagged from '../../assets/imgs/jagged.svg';

export enum Moods {
    Neutral = "neutral",
    Cheerful = "cheerful",
    Gloomy = "gloomy",
    Flirty = "flirty",
    Sarcastic = "sarcastic"
};

export type AIResponse = {
    prompt:string,
    response:string,
    error?:string,
    mood:string,
    timestamp:number,
    favorite:boolean,
    id:string
};

const Main:React.FC = () => {
    const [responses, setResponses] = useState<AIResponse[]>([]);
    const [mood, setMood] = useState(Moods.Neutral);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage?.AIresponses) {
            setResponses(JSON.parse(localStorage.AIresponses));
        }
    }, []);

    const handleRequest = (prompt:string) => {
        apiRequest(prompt, mood, responses, setResponses, setLoading);
    }

    return (
        <div className="main">
            <Decoration mood={mood}/>
            <Header/>
            <main>
                <section className="main__section main__inputs">
                    <div className="main__screen">
                        <MoodSelector handleMoodChange={setMood} mood={mood}/>
                        {loading
                            ? <p>processing...</p>
                            : <Form handleRequest={handleRequest} />
                        }
                    </div>
                </section>
                <section className="main__section main__outputs">
                    <Print responses={responses} setResponses={setResponses}/>
                </section>
                <div className='main__jagged' style={{backgroundImage: `url(${jagged})`}}/>
            </main>
        </div>
    );
};

export default Main;
