import React, {useState, useEffect} from 'react';
import './App.css';
import Dictionary from './Dictionary';

function App() {

  const [wordInfo, setWordInfo] = useState('');
  const [inputValue, setInputValue] = useState('beauty');
  const [isFind, setIsFind] = useState(true);

  const getWordMeaning = () => {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`).then(
        response => {
          return response.json();
        }
      ).then(
        data => {
          
            if(data.title === "No Definitions Found"){
              setIsFind(false);
            }
            else{
              // word name
              const {word, phonetic} = data[0];
    
              // audio link
              const audioArray = data[0].phonetics.filter((a) => {
                return a.audio.length > 0;
              });
              const {audio} = audioArray[0];
    
              // Definition
              let {definition, example} = data[0].meanings[0].definitions[0];
    
              if(example === undefined){
                example = "Sorry, example sentence not available for this word"
              }
  
              // partOfSpeech
              const {partOfSpeech} = data[0].meanings[0];
              // synonyms
              const synonyms = data[0].meanings[0].synonyms.join(', ');
    
              // my object with word meaning
              const mywordInfo = {
                word,
                audio,
                definition,
                example,
                synonyms,
                partOfSpeech,
                phonetic
              }
              setWordInfo(mywordInfo);
              setIsFind(true);
            }
        }
      );
  }

  useEffect(() => {
    getWordMeaning();
  }, []);

  return (
    <div className="container">
      <h1>English Dictionary App</h1>

      <div className="search-box">
        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder='type any word..'/>
        <button onClick={() => getWordMeaning()}>Search</button>
      </div>

      {
        isFind ? <Dictionary {...wordInfo}/> : <h3 style={{textAlign: "center", marginTop: "40px", color: "red"}}>Meaning Not Found!</h3>
      }
      
    </div>
  );
}

export default App;
