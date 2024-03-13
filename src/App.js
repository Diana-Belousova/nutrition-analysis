import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const MY_ID = 'e11d3a34';
  const MY_KEY = 'd11d1e98f85a421cb7a31ba15fd76a7b';
  const MY_URL = 'https://api.edamam.com/api/nutrition-details';

  const [mySearch, setMySearch] = useState('');
  const [submit, setSubmit] = useState('');
  const [myNutrition, setMyNutrition] = useState();

  const analyseIngridients = async (ingridients) => {
    // const responce = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      const responce = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=e11d3a34&app_key=d11d1e98f85a421cb7a31ba15fd76a7b`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingridients })
    })
    console.log(responce);

    if(responce.ok) {
      const data = await responce.json();
      setMyNutrition(data);
      console.log(myNutrition);
    }
    else {
      console.log('failed request')
    }
    
  }

  const myAnalysisSearch = (e) => {
    setMySearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setSubmit(mySearch);
  }


  useEffect(() => {
    if (submit !== '') {
      let ingridients = submit.split(/[,,;,\n,\r]/);
      console.log(ingridients);
      analyseIngridients(ingridients);
    }
  }, [submit])

  return (
    <div>
      <div className='container'>
        <h1>Nutrition Analysis</h1>
      </div>
      <div className='container'>
        <form onSubmit={finalSearch}>
          <input 
          className='search'
          onChange={myAnalysisSearch}
          value={mySearch} 
          placeholder="type ingridients..." 
          />
        </form>
      </div>
      <div className='container'>
        <button onClick={finalSearch} type='submit'>Send</button>
      </div>
      <div className='container'>

      </div>
    </div>
  );
}

export default App;
