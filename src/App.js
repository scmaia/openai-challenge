import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.scss';
import Decoration from '../src/Components/Decoration/Decoration';
import Form from '../src/Components/Form/Form';
import ResponseCard from '../src/Components/ResponseCard/ResponseCard';

function App() {

  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(localStorage.AIresponses) {
      setResponses(JSON.parse(localStorage.getItem("AIresponses")))
    }
  }, [])

  const handleRequest = (data, prompt, mood) => {
    setLoading(true);
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
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
          response: responseData.choices[0].text,
          mood: mood,
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
    <div className="App">
      <header className="App-header">
        {/* <Decoration /> */}
      </header>
      <main>
        <section>
          {loading
            ? <p>processing...</p>
            : <Form handleRequest={handleRequest}/>
          }
        </section>
        <section>
          {responses.map ((response) =>
              <ResponseCard
                key={response.id}
                response={response.response}
                mood={response.mood}
                timestamp={response.timestamp}
              />
            )}
        </section>
      </main>
    </div>
  );
}

export default App;
