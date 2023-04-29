import { useState, useEffect } from 'react';

export default function Count() {
    const [text, setText] = useState('');
    const [words, setWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [wpm, setWpm] = useState(200);
    const [intervalSpeed, setIntervalSpeed] = useState();
    const [highlightedText, setHighlightedText] = useState('');

    function handleSubmit(event) {
      event.preventDefault();
  
      // Split the text into an array of words
      const words = text.trim().split(/\s+/);
  
      // Update the words state variable and reset the current word index
      setWords(words);
      setCurrentWordIndex(0);
  
      // Calculate the new interval speed based on the current WPM value and number of words
      const newIntervalSpeed = (60 / 100) * 1000; // 600 milliseconds
      setIntervalSpeed(newIntervalSpeed);
  
      // Stop the interval if it is running
      setIsRunning(false);

        // Reset the highlighted text
        setHighlightedText('');

    }
  
    function handleChange(event) {
      setText(event.target.value);
    }
  
    function handleSpeedChange(event) {
      const newWpm = event.target.value;
      setWpm(newWpm);
  
      // Calculate the new interval speed based on the current WPM value and number of words
      const wordsPerSecond = newWpm / 60;
      const intervalSpeed = 1000 / wordsPerSecond;
      setIntervalSpeed(intervalSpeed);
    }
  
    function startStop() {
      setIsRunning((prevIsRunning) => !prevIsRunning);
    }
  
    function calculateWpm() {
      // Calculate the WPM based on the current interval speed and number of words
      const wordsPerSecond = 1000 / intervalSpeed;
      const currentWpm = wordsPerSecond * 60;
      setWpm(currentWpm);
    }
  
    useEffect(() => {
      if (intervalSpeed) {
        calculateWpm();
      }
    }, [intervalSpeed]);
  
    function startDisplayingWords() {
        const intervalId = setInterval(() => {
            if (currentWordIndex >= words.length) {
              clearInterval(intervalId);
              setCurrentWordIndex(0);
              setIsRunning(false);
              return;
            }
          
            setCurrentWordIndex((prevIndex) => prevIndex + 1);
        }, intervalSpeed);
  
      return intervalId;
    }
  
    useEffect(() => {
      if (isRunning) {
        const intervalId = startDisplayingWords();
        return () => clearInterval(intervalId);
      }
    }, [isRunning, currentWordIndex]);
  
    useEffect(() => {
        // Update the highlighted text
        const highlightedWords = words.slice(0, currentWordIndex).join(' ');
        const currentWord = words[currentWordIndex];
        const restOfText = words.slice(currentWordIndex + 1).join(' ');
        const highlightedText = `${highlightedWords} ${currentWord ? `<span class="bg-yellow-200">${currentWord}</span>` : ''} ${restOfText}`;
        setHighlightedText(highlightedText);
      }, [words, currentWordIndex]);

    return (
        <div className="container mx-auto mt-20">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <textarea id="message" value={text} onChange={handleChange} rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." />
                </div>
                <div className="flex">
                    <button type="submit" className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>
            <div
            className="text-center"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
            ></div>
            <div>
                <input 
                type="range" 
                min="100" 
                max="800" step="50" value={wpm} onChange={handleSpeedChange} onInput={handleSpeedChange} />
                <span>Speed: {wpm}</span>
            </div>
            <div className='text-center'>
                {words[currentWordIndex]}
            </div>
            <button onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>

            {/* <div>
                {words.map((word, index) => (
                    <span key={index}>
                        {index === currentWordIndex ? word : '___'}{' '}
                    </span>
                ))}
            </div>
            {isRunning && (
                <p>
                    Current word: {words[currentWordIndex]} (index: {currentWordIndex})
                </p>
            )} */}
        </div>

    );
};