import React from "react";
import "./Dictionary.css";

const Dictionary = ({word, audio, definition, example, partOfSpeech, synonyms, phonetic}) => {

  function playSound(){
    document.getElementById('sound').play();
  }

  const type = partOfSpeech + "  " + phonetic;

  return (
    <div>
      <audio src={audio} id="sound"></audio>
      <div className="word-audio">
        <div>
          <h2>{word}</h2>
          <span>{type}</span>
        </div>
        <i className="bi bi-volume-up-fill audio" onClick={playSound}></i>
      </div>

      <div className="desc">
        <h4>Definition</h4>
        <p>{definition}</p><br/>
      </div>

      {/* && is because this data has not initial value it got from other file  */}
      {
        synonyms && synonyms.length > 0 ? <div className="desc">
          <h4>Synonyms</h4>
          <p>{synonyms}</p><br/>
        </div> : ""
      }
      

      <div className="desc">
        <h4>Example sentence</h4>
        <p>{example}</p>
      </div>
    </div>
  );
};

export default Dictionary;
