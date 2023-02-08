import { useEffect, useRef, useState } from 'react';
import './App.css';

function App () {

  const [timerInput, setTimerInput] = useState(10);
  const [timer, setTimer] = useState(timerInput);
  const [switchTime, setSwitchTime] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [text, setText] = useState("");
  const textareaRef = useRef();
  const initialTimer = timerInput;

  const timerStyle = {
    backgroundColor: timer <= 3 && "#970f0f",
    color: timer <= 3 && "#fff"
  };

  function inputTimer (time) {
    setTimerInput(time);
    setTimer(time);
    setText("");
    setWordCount(0);
    setSwitchTime(false);
  }
  useEffect(() => {
    if (timer > 0 && switchTime) {
      setTimeout(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (timer == 0) {
      setSwitchTime(false);
    }
  }, [timer, switchTime]);

  function wordCounter (text) {
    setText(text);
    const pureText = text.trim().split(" ");
    setWordCount(pureText.length);
  }
  function handleStartBtn () {
    if (timer != 0) {
      setSwitchTime((prev) => !prev);
      textareaRef.current.disabled = false;
      textareaRef.current.focus();
    }
    else {
      setTimer(initialTimer);
      setWordCount(0);
      setText("");
      setSwitchTime(true);
    }

  }
  function btnText () {
    if (timer === 0) return "start over";
    else if (switchTime) return "stop";
    else return "start";
  }


  return (
    <div className="App">
      <h1>How fast can you type</h1>
      <pre>type as much as you can in {timerInput} seconds, see your speed in words per {timerInput} seconds
        <br />or set your own time here</pre>
      <input
        name='timerInput'
        type="number"
        value={timerInput}
        disabled={switchTime}
        onChange={(e) => inputTimer(e.target.value)} />
      <textarea
        ref={textareaRef}
        disabled={!switchTime}
        type="text"
        name="text"
        value={text}
        onChange={(e) => wordCounter(e.target.value)}
      />
      <h2>Time count down: <span style={timerStyle}>{timer}</span></h2>
      <button className={switchTime ? "btn-hover-red" : ""} onClick={handleStartBtn}>{btnText()}</button>
      <h2>Word count: <span>{wordCount}</span> in {timerInput - timer} sec</h2>
      <p>your {timer != 0 && "instant"} speed per sec: <span>{(wordCount / (timerInput - timer)).toFixed(2)}</span> words</p>
    </div>
  );
}

export default App;
