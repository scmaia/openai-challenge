import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { cheerfulExample, gloomyExample, flirtyExample, sarcasticExample } from "./utils";
import './Main.scss';
import Decoration from '../../components/Decoration/Decoration';
import MoodSelector from '../../components/MoodSelector/MoodSelector';
import Form from '../../components/Form/Form';
import ResponseCard from '../../components/ResponseCard/ResponseCard';
// import typewritterLeft from '../../assets/imgs/typewritter-left.svg';

const API_URL="https://api.openai.com/v1/engines/text-davinci-002/completions";

export enum Moods {
    Neutral = "neutral",
    Cheerful = "cheerful",
    Gloomy = "gloomy",
    Flirty = "flirty",
    Sarcastic = "sarcastic"
};

type MoodsObj = {
    [key in Moods]: string;
};

type AIResponse = {
    prompt:string,
    response:string,
    mood:string,
    timestamp:number,
    favorite:boolean,
    id:string
};

const Main:React.FC = () => {
    const defaultMoodFilters = Object.values(Moods).reduce((prev, curr) => ({ ...prev, [curr]: true }), {}) as MoodsObj;
    const [responses, setResponses] = useState<AIResponse[]>([]);
    const [mood, setMood] = useState(Moods.Neutral);
    const [moodFilters, setMoodFilters] = useState<MoodsObj>(defaultMoodFilters);
    const [favoriteFilter, setFavoriteFilter] = useState(false)
    const [filteredResponses, setFilteredResponses] = useState<AIResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (localStorage.AIresponses) {
            setResponses(JSON.parse(localStorage.AIresponses));
        }
    }, []);

    useEffect(() => {
        setFilteredResponses([...responses]);
        resetFilters();
    }, [responses]);

    useEffect(() => {
        const moodsArray = Object.keys(moodFilters).filter((k) => moodFilters[k as keyof MoodsObj]);
        const preFiltered = favoriteFilter ? responses.filter(response => response.favorite === true) : responses;
        setFilteredResponses(preFiltered.filter(response => moodsArray.includes(response.mood)))
    }, [moodFilters, favoriteFilter]);

    const handleMoodChange = (newMood:Moods) => {
        setMood(newMood);
    };

    const handleMoodCheckbox = (key:Moods) => {
        setMoodFilters({...moodFilters, [key]: !moodFilters[key]});
    };

    const resetFilters = () => {
        setMoodFilters(Object.values(Moods).reduce((prev, curr) => ({ ...prev, [curr]: true }), {}) as MoodsObj);
        setFavoriteFilter(false);
    };

    const formatRequestData = (prompt:string) => {
        let formattedPrompt;
        if (mood === Moods.Cheerful) {
            formattedPrompt = cheerfulExample(prompt);
        } else if (mood === Moods.Gloomy) {
            formattedPrompt = gloomyExample(prompt);
        } else if (mood === Moods.Flirty) {
            formattedPrompt = flirtyExample(prompt);
        } else if (mood === Moods.Sarcastic) {
            formattedPrompt = sarcasticExample(prompt);
        } else {
            formattedPrompt = prompt;
        };

        const formattedData = {
            prompt: formattedPrompt,
            temperature: 0.5,
            max_tokens: 60,
            top_p: 0.3,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        };

        return formattedData;
    }

    const handleRequest = (prompt:string) => {
        setLoading(true);
        const requestObj = formatRequestData(prompt);
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
            },
            body: JSON.stringify(requestObj),
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                };
                throw response;
            })
            .then(responseData => {
                const newResponses = [{
                    prompt: prompt,
                    response: responseData.choices[0].text as string,
                    mood: mood,
                    favorite: false,
                    timestamp: Date.now(),
                    id: uuidv4()
                }, ...responses];
                localStorage.setItem("AIresponses", JSON.stringify(newResponses))
                setResponses(newResponses);
            })
            .catch(error => {
                console.error("Error fetching data from openAI api: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <div className="main">
            <header className="main__header">
                <Decoration mood={mood}/>
                <h1>Moody AI</h1>
                <h2>by Sara Maia</h2>
                <p className='main__credits'>Powered by OpenAI</p>
            </header>
            <main>
                <section className="main__inputs main__section">
                    <MoodSelector handleMoodChange={handleMoodChange} mood={mood}/>
                    {loading
                        ? <p>processing...</p>
                        : <Form handleRequest={handleRequest} />
                    }
                </section>
                <section className="main__outputs main__section">
                    <div>
                        <ul className='main__filters'>
                            {Object.entries(Moods).map(([key, value]: [string, Moods]) => 
                                <li key={`checkbox-${key}`} className='main__filter'>
                                    <input
                                        className='main__filter-input'
                                        type="checkbox"
                                        name={key}
                                        id={key}
                                        value={moodFilters[value as keyof MoodsObj]}
                                        checked={Boolean(moodFilters[value as keyof MoodsObj])}
                                        onChange={() => handleMoodCheckbox(value as keyof MoodsObj)}
                                    />
                                    <label htmlFor={key} className='main__filter-label'>{key}</label>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className='main__responses'>
                        {filteredResponses.map((response) =>
                            <ResponseCard
                                key={response.id}
                                prompt={response.prompt}
                                response={response.response}
                                mood={response.mood}
                                favorite={response.favorite}
                                timestamp={response.timestamp}
                            />
                        )}
                        {/* <img src={typewritterLeft}/> */}
                    </div>
                </section>
                <div className='main__jagged'/>
            </main>
        </div>
    );
};

export default Main;
