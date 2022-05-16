import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { cheerfulExample, gloomyExample, flirtyExample, sarcasticExample } from "./utils";
import './Main.scss';
import Decoration from '../../components/Decoration/Decoration';
import MoodSelector from '../../components/MoodSelector/MoodSelector';
import Form from '../../components/Form/Form';
import ResponseCard from '../../components/ResponseCard/ResponseCard';
import typewritter from '../../assets/imgs/typewritter.png';
import jagged from '../../assets/imgs/jagged.svg';

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
    //do-do
    const defaultMoodFilters = Object.values(Moods).reduce((prev, curr) => ({ ...prev, [curr]: true }), {}) as MoodsObj;
   
    const [responses, setResponses] = useState<AIResponse[]>([]);
    const [mood, setMood] = useState(Moods.Neutral);
    const [moodFilters, setMoodFilters] = useState<MoodsObj>(defaultMoodFilters);
    const [favoriteFilter, setFavoriteFilter] = useState(false)
    const [filteredResponses, setFilteredResponses] = useState<AIResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (localStorage?.AIresponses) {
            setResponses(JSON.parse(localStorage.AIresponses));
        }
    }, []);

    useEffect(() => {
        setFilteredResponses([...responses]);
        resetFilters();
    }, [responses]);

    useEffect(() => {
        //to-do
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

    const handleFavoriteCheckbox = () => {
        setFavoriteFilter(!favoriteFilter);
    };

    const resetFilters = () => {
        setMoodFilters(Object.values(Moods).reduce((prev, curr) => ({ ...prev, [curr]: true }), {}) as MoodsObj);
        setFavoriteFilter(false);
    };

    const toggleFavorite = (id:string) => {
        const foundIndex = responses.findIndex(response => response.id === id);
        const updatedResponses = [...responses];
        updatedResponses[foundIndex].favorite = !updatedResponses[foundIndex].favorite;
        setResponses(updatedResponses);
        localStorage.setItem("AIresponses", JSON.stringify(updatedResponses));
        
    }

    // todo
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
                document.getElementById("responses")?.scrollIntoView({
                    behavior: 'smooth'
                });
            })
    }

    return (
        <div className="main">
            <header className="main__header">
                <Decoration mood={mood}/>
                <div className="main__title-container">
                    <h1 className="main__title" title="Moody AI">Moody AI</h1>
                </div>
                <h2>by Sara Maia</h2>
                <p className='main__credits'>Powered by OpenAI</p>
            </header>
            <main>
                <section className="main__inputs main__section">
                    <div className="main__screen">
                        <MoodSelector handleMoodChange={handleMoodChange} mood={mood}/>
                        {loading
                            ? <p>processing...</p>
                            : <Form handleRequest={handleRequest} />
                        }
                    </div>
                </section>
                <section className="main__outputs main__section">
                    <div className='main__container'>
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
                        <div className='main__favorite'>
                            <input
                                className='main__filter-input main__filter-input--fave'
                                type="checkbox"
                                name="favorite"
                                id="favorite"
                                value="favorite"
                                checked={favoriteFilter}
                                onChange={handleFavoriteCheckbox}
                            />
                            <label htmlFor="favorite" className='main__filter-label'>Favorites Only</label>
                        </div>
                    </div>
                    <div className='main__responses' id='responses'>
                        {filteredResponses.map((response) =>
                            <ResponseCard
                                key={response.id}
                                prompt={response.prompt}
                                response={response.response}
                                mood={response.mood}
                                favorite={response.favorite}
                                timestamp={response.timestamp}
                                id={response.id}
                                toggleFavorite={toggleFavorite}
                            />
                        )}
                        {filteredResponses.length === 0 && <p>{`>>> `}No response history to show. Submit a prompt or change the filters above.</p>}
                        <img className='main__typewriter main__typewriter--right' src={typewritter}/>
                        <img className='main__typewriter main__typewriter--left' src={typewritter}/>
                    </div>
                </section>
                <div className='main__jagged' style={{backgroundImage: `url(${jagged})`}}/>
            </main>
        </div>
    );
};

export default Main;
