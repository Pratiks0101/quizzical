import React from 'react'
import Questions from './components/Questions'
import { decode } from 'html-entities'

const App = () => {

  const [isQuizStarted, setIsQuizStarted] = React.useState(false)
  const [questionsList, setQuestionsList] = React.useState([])
  const [selectedAnswer, setSelectedAnswer] = React.useState({})
  const [isChecked, setIsChecked] = React.useState(false)


  function startQuiz() {
    setIsQuizStarted(true)
  }

  function handleClick(qIndex, e){
    setSelectedAnswer(prevAnswer => {
      return {
        ...prevAnswer,
        [qIndex]: e.target.value
      }
    })
  }

  let score = 0

  for(let i = 0; i < questionsList.length; i++){
    if(questionsList[i].correct_answer === selectedAnswer[i]) {
      score = score + 1
    }
  }

  function checkAnswer() {
  setIsChecked(true)
  }

  function playAgain(){
    setIsQuizStarted(false)
    setQuestionsList([])
    setSelectedAnswer({})
    setIsChecked(false)
  }

  React.useEffect(() =>{
    if (!isQuizStarted) {
      return undefined
    }
    async function questionAPI() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
          const data = await response.json()
        
          if(data.response_code === 0){
            const formattedQuestions = data.results.map(item => {
              const shuffledOptions = [item.correct_answer, ...item.incorrect_answers]
                                      .sort(() => Math.random() - 0.5)
                                      .map(option => decode(option))
            return {
                ...item,
                all_options: shuffledOptions,
                questions: decode(item.question)
              }
            })
            setQuestionsList(formattedQuestions)
          }
  
    } catch (error) {
      console.log(error)
    }
  } 
  questionAPI()
  },[isQuizStarted])

  return (
    <main className="bg-[#F5F7FB] w-screen h-screen relative flex flex-col items-center justify-center overflow-hidden">
      
    <div className="w-full h-full absolute top-0 left-0 z-0 overflow-hidden pointer-events-none">
      <img className="absolute top-0 right-0 z-0" src="./blob-top.svg" alt="blob-right" />
      <img className="absolute bottom-0 left-0 z-0" src="./blob-bottom.svg" alt="blob-left" />
    </div>
  {!isQuizStarted &&
      <>
        <div>
          <h1 className="text-[#293264] font-[karla] font-bold text-3xl text-center">Quizzical</h1>
          <p className="text-center text-[#293264] mt-2 max-w-100 font-[karla] font-light tracking-tighter leading-4">Test your knowledge with 5 dynamic multi-category questions. Play now and see how many you can ace! ♠️</p>
        </div>
        <button 
          className="bg-[#4D5B9E] text-[#F5F7FB] w-48.25 h-13 rounded-xl mt-8 cursor-pointer"
          onClick={startQuiz}
          >Start Quiz</button>
      </>
    } 
    <div className='relative z-10'>
      {isQuizStarted && <Questions 
                            questionsList={questionsList} 
                            handleClick={handleClick} 
                            checkAnswer={checkAnswer}
                            isChecked={isChecked}
                            score={score}
                            playAgain={playAgain}
                            selectedAnswer={selectedAnswer}
                            />} 
    </div>
    </main>
  )
}

export default App
