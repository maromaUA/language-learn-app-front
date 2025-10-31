import { useState } from 'react'
import './App.css'
import { Statistics } from './Components/Statistics'
import { ProgressBar } from './Components/ProgressBar'
import { MainCard } from './Components/MainCard'
import { FeedBackMessage } from './Components/FeedbackMessage'
import { useVerbs } from './Hooks/useVerbs'


function App() {
  
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mistakes, setMistakes] = useState([])
  const [showStats, setShowStats] = useState(false)
  const [mistakenWords, setMistakenWords] = useState([]);
  const [level, setLevel] = useState(1)

  const API_URL = import.meta.env.VITE_API_URL
  const {currentArr, setCurrentArr, loading} = useVerbs(API_URL, level)

  
  const nextLevelHandler = () => {
    setLevel(prev=>prev+1)
    restartHandler()
  }

  const restartHandler= () => {
      setCurrent(0);
      setAnswer("");
      setFeedback(false);
      setShowFeedback(false);
      setProgress(0);
      setMistakes([]);
      setShowStats(false);
      setMistakenWords([])
    
  }
  // check button handler
  const checkHandler = () => {
    const isCorrect = checkAnswer(answer)
    setFeedback(isCorrect)
    setShowFeedback(true)
  }

  // next qustion function
  const nextHandler = () => {
    if (current < currentArr.length - 1) {
      if (feedback) {
        increaseProgress()
      } else {
        setMistakes(prev => [...prev, currentArr[current]])
      }
      setCurrent(prev => prev + 1)
      setAnswer('')
      setShowFeedback(false)
    } else {
      if (feedback) {
    increaseProgress() 
  }
  else {
    setMistakes(prev => {
      const updated = [...prev, currentArr[current]]
      if (updated.length > 0) {
        setCurrentArr(updated)
        setMistakes([])
        setCurrent(0)
        setShowFeedback(false)
      }
      return updated
    })
    return
  }
      if (mistakes.length > 0) {
        // repeating mistakes only
        setCurrentArr(mistakes)
        setMistakes([])
        setCurrent(0)
        setShowFeedback(false)
      } else {
        setShowStats(true)
      }
    }
  }

  const handleChange = (e) => {
    setAnswer(e.target.value)
  }

  //  checking translation
  const checkAnswer = (answer) => {
    if (currentArr[current].translation.includes(answer.toLowerCase().trim())) {
      return true
    } else {
      setMistakenWords((prev) => {
      if (!prev.some(word => word === currentArr[current].verb)) {
        return [...prev, currentArr[current].verb];
      }
      return prev;//adding only unique mistakes in mistakes array
    });
      return false
    }
  }

  // progress bar handler
  const increaseProgress = () => {
  
    setProgress(prev => prev+10)
  }

  if (loading) return <p>Loading....</p>;
  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-full md:w-2/3 lg:w-1/2 p-7 text-gray-200'>
      {/* Progress bar */}
     <ProgressBar progress={progress}/>

      {/* Main card */}
      {!showStats ? (
          <>
             <MainCard answer={answer} handleChange={handleChange} level={level} currentArr={currentArr} current={current} checkHandler={checkHandler}/>
  
            {/* Feedback message */}
            <div className='h-20 mt-5'>
              {showFeedback && (
               <FeedBackMessage feedback={feedback} currentArr={currentArr} current={current} nextHandler={nextHandler}/>
              )}
            </div>
          </>

      ) : (
        <Statistics mistakes={mistakenWords} restart={restartHandler} nextLevel={nextLevelHandler}/>
      )}
    </div>
  )
}

export default App
