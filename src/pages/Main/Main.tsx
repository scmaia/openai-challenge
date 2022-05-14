import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import './Main.scss';
import Decoration from '../../components/Decoration/Decoration';
import MoodSelector from '../../components/MoodSelector/MoodSelector';
import Form from '../../components/Form/Form';
import ResponseCard from '../../components/ResponseCard/ResponseCard';

const API_URL="https://api.openai.com/v1/engines/text-curie-001/completions";

type AIResponse = {
    prompt:string,
    response:string,
    mood:string,
    timestamp:number,
    favorite:boolean,
    id:string
}

export enum Moods {
    Neutral = "neutral",
    Cheerful = "cheerful",
    Gloomy = "gloomy",
    Flirty = "flirty",
    Sarcastic = "sarcastic"
}

type MoodsObj = {
    [key in Moods]: string;
}

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
        // const moodsArray = Object.keys(moodFilters).filter((k) => moodFilters[k]));
        // const preFiltered = favoriteFilter ? responses.filter(response => response.favorite === true) : responses;
        // setFilteredResponses(preFiltered.filter(response => response.mood === ))
    }, [moodFilters, favoriteFilter]);

    const handleMoodChange = (newMood:Moods) => {
        setMood(newMood);
    };

    const handleMoodCheckbox = (event:React.ChangeEvent<HTMLInputElement>, key:Moods) => {
        setMoodFilters({...moodFilters, [moodFilters[key]]: event.target.value});
    };

    const resetFilters = () => {
        setMoodFilters(Object.values(Moods).reduce((prev, curr) => ({ ...prev, [curr]: true }), {}) as MoodsObj);
        setFavoriteFilter(false);
    };

    const handleRequest = (data:object, prompt:string) => {
        setLoading(true);
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
            },
            body: JSON.stringify(data),
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
            <header>
                {/* <Decoration /> */}
            </header>
            <main>
                <section>
                    <MoodSelector handleMoodChange={handleMoodChange} mood={mood}/>
                    {loading
                        ? <p>processing...</p>
                        : <Form handleRequest={handleRequest} mood={mood}/>
                    }
                </section>
                <section>
                    <div>
                        <form>
                            {Object.entries(Moods).map(([key, value]: [string, Moods]) =>
                                <div key={key}>
                                    <input
                                        type="checkbox"
                                        key={`checkbox-${key}`}
                                        name={key}
                                        value={moodFilters[key as keyof MoodsObj]}
                                        checked={true}
                                        onChange={(event) => handleMoodCheckbox(event, key as keyof MoodsObj)}
                                    />
                                    <label htmlFor={key}>{key}</label>
                                </div>
                            )}
                        </form>
                    </div>
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
                </section>
            </main>
        </div>
    );
}

export default Main;
