import React, { useState } from 'react';
import "./App.css";

function App() {
  const [inputs, setInputs] = useState({
    surface: '',
    bedrooms: '',
    restrooms: ''
  });
  const [multipleInputs, setMultipleInputs] = useState({
    surface: [],
    bedrooms: [],
    restrooms: []
  });

  const [prediction, setPrediction] = useState(null);
  const [graph, setGraph] = useState(null);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inputs",inputs)
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    });

    const data = await response.json();
 
    console.log(data.prediction)
    setPrediction(data.prediction);

/*     const graph = JSON.parse(data.graph);
    setGraph(graph); */
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if(!inputs.surface || !inputs.bedrooms || !inputs.restrooms) return;
    setMultipleInputs({
      surface: [...multipleInputs.surface, inputs.surface],
      bedrooms: [...multipleInputs.bedrooms, inputs.bedrooms],
      restrooms: [...multipleInputs.restrooms, inputs.restrooms]
    });
    setInputs({
      surface: '',
      bedrooms: '',
      restrooms: ''
    });
    

    // Lógica adicional si se requiere
  };

  return (
    <div className="App">
      <h1>Housing Price Prediction</h1>
      <form onSubmit={handleSubmit} id='formulario'>
        <label htmlFor="surface">Surface:</label>
        <input type="text" id="surface" name="surface" value={inputs.surface} onChange={handleChange} />

        <label htmlFor="bedrooms">Bedrooms:</label>
        <input type="text" id="bedrooms" name="bedrooms" value={inputs.bedrooms} onChange={handleChange} />

        <label htmlFor="restrooms">Restrooms:</label>
        <input type="text" id="restrooms" name="restrooms" value={inputs.restrooms} onChange={handleChange} />

        <button onClick={handleSave}>Save</button>
        <button type="submit">Predict</button>
      </form>
      {multipleInputs.surface.length > 0 && (
        <div>
          <h2>Multiple Inputs</h2>
          <ul>
            {multipleInputs.surface.map((surface, index) => (
              <li key={index}>
                <p>Surface: {surface} | Bedrooms: {multipleInputs.bedrooms[index]} | Restrooms: {multipleInputs.restrooms[index]}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {prediction && (
        <section className="prediction">
        <h2>Predicted Price: </h2>

          <p >{parseFloat(prediction).toFixed(2)}€</p>

      </section>

      )}

      {graph && (
        <Plot
          data={graph.data}
          layout={graph.layout}
        />
      )}
    </div>
  );
}

export default App;