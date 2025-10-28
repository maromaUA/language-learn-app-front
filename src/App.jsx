import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Statistics } from './Statistics'


function App() {
  
  const [initialArr, setInitialArr] = useState([])
  const [currentArr, setCurrentArr] = useState([])
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mistakes, setMistakes] = useState([])
  const [showStats, setShowStats] = useState(false)
  const [loading, setLoading] = useState(true);
  const [mistakenWords, setMistakenWords] = useState([]);
  const [level, setLevel] = useState(1)

  const API_URL = "https://17ljof7q2d.execute-api.eu-west-2.amazonaws.com/dev/getAllVerbs"

//  const populateArrayLevel = () => {
//   const arr = initialArr.filter(elem=>elem.level===level)
  
//   setCurrentArr([...arr])
//  }


 
  const nextLevelHandler = () => {
    setLevel(prev=>prev+1)
    restartHandler()
  }

  const restartHandler= () => {
    //  fetchWords();
      setCurrent(0);
      setAnswer("");
      setFeedback(false);
      setShowFeedback(false);
      setProgress(0);
      setMistakes([]);
      setShowStats(false);
      setMistakenWords([])
    
  }



useEffect(() => {
     const fetchWords = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}`);
        // Если у тебя Lambda Proxy Integration, ответ может быть внутри response.data.body
        console.log(response.data)
        //const data = JSON.parse(response.data);
        setInitialArr([...response.data]);
      } catch (err) {
        console.error("Error fetching words:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, []); // Пустой массив = вызов только при монтировании компонента

  useEffect(() => {
  if(initialArr.length > 0) {
    setCurrentArr(initialArr.filter(elem => elem.level === level));
  }
}, [initialArr, level]);


  // 🔹 проверка ответа
  const checkHandler = () => {
    const isCorrect = checkAnswer(answer)
    setFeedback(isCorrect)
    setShowFeedback(true)
  }

  // 🔹 переход к следующему вопросу
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
      // 🔹 если дошли до конца
      if (feedback) {
    increaseProgress() // ✅ добавляем прогресс за последний правильный ответ
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
        // повторяем только ошибки
        setCurrentArr(mistakes)
        setMistakes([])
        setCurrent(0)
        setShowFeedback(false)
      } else {
        setShowStats(true)
      }
    }
  }

  // 🔹 обработка ввода
  const handleChange = (e) => {
    setAnswer(e.target.value)
  }

  // 🔹 проверка перевода
  const checkAnswer = (answer) => {
   
     
    if (currentArr[current].translation.includes(answer.toLowerCase().trim())) {
      return true
    } else {
      setMistakenWords((prev) => {
      if (!prev.some(word => word === currentArr[current].verb)) {
        return [...prev, currentArr[current].verb];
      }
      return prev;
    });
      return false
    }
  }

  // 🔹 прогресс
  const increaseProgress = () => {
  
    setProgress(prev => prev+10)
  }

//   let message = ''
//   if(currentArr.length>0){
//   if (feedback) {
//     message = "✅ Exactly"
//   } else {
//     message = `❌ Right answer is ${currentArr[current].translation[0]}`
//   }
// }

  

  if (loading) return <p>Loading...</p>;
  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-full md:w-2/3 lg:w-1/2 p-7 text-gray-200'>
      {/* Progress bar */}
      <div className='w-full bg-[#38464F] rounded-full h-4 mb-10'>
        <div
          className='bg-[#93D334] h-4 rounded-full transition-all duration-300'
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main card */}
      {!showStats ? (
        <div className='flex flex-col justify-center items-center gap-6'>
          <div className='text-lime-500 text-2xl font-bold'>LEVEL {level}</div>
          <h1 className='text-2xl font-semibold'>Translate a verb </h1>
          <div className='text-3xl font-bold'>{currentArr.length>0 && currentArr[current].verb}</div>

          <input
            type="text"
            value={answer}
            onChange={handleChange}
            className='border border-gray-200 rounded-md p-2 w-64 text-gray-200 text-2xl font-bold placeholder-gray-400 bg-transparent text-center'
            placeholder="Enter translation"
            autoFocus
          />

          <button
            onClick={checkHandler}
            className='bg-[#93D334] text-2xl font-bold mt-2 text-gray-900 px-4 py-2 rounded-md shadow-md hover:bg-gray-500 transition'
          >
            Check
          </button>

          {/* Feedback message */}
          <div className='h-20'>
            {showFeedback && (
              <div
                className={`bg-[#38464F] ${
                  feedback ? "text-lime-500" : "text-red-500"
                } text-2xl p-3 rounded-md text-center`}
              >
                <div>{currentArr.length>0 && feedback ? "✅ Exactly" : <span>❌ Right answer is <span className='font-bold'>{currentArr[current].translation[0]}</span></span>}</div>
                <button
                  onClick={nextHandler}
                  className={`${
                    feedback ? "bg-lime-500" : "bg-red-500"
                  } text-2xl font-bold text-gray-900 px-4 py-2 mt-3 rounded-md shadow-md hover:bg-gray-500`}
                >
                  {feedback ? "Continue" : "Got it"}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Statistics mistakes={mistakenWords} restart={restartHandler} nextLevel={nextLevelHandler}/>
      )}
    </div>
  )
}

export default App
