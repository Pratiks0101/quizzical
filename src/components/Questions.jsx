import clsx from "clsx"
import Confetti from "react-confetti"

const Questions = (props) => {

    return (
        <div>
            {props.isChecked && props.score >=4 && 
            <Confetti 
                    numberOfPieces={10000} 
                    width={window.innerWidth} 
                    recycle={false}  />}
            {props.questionsList.length === 0 
                ? <h1>Loading Question...</h1> 
                : props.questionsList.map((question, qIndex) =>  (
            <div className="max-w-[90vw]" key={qIndex}>
                <h3 className="text-[#293264] font-bold my-1">{(question.questions)}</h3>
                
                    {question.all_options.map((option, optIndex) => {
                        const isCorrect = option === question.correct_answer
                        const isWrong = option === props.selectedAnswer[qIndex] && !isCorrect
                        const uniqueId = `question${qIndex}-option${optIndex}`
                        return (
                            <div key={optIndex} className="inline-block disabled:cursor-not-allowed disabled:opacity-50">
                                <input 
                                className="hidden peer "
                                id={uniqueId}
                                type="radio" 
                                onChange={(e) => props.handleClick(qIndex, e)}
                                name={`question-group-${qIndex}`}
                                value={option}
                                disabled={props.isChecked}
                                />
                                <label 
                                className={clsx("border rounded-lg m-2 px-2 py-1.5 border-[#4D5B9E] text-[#293264] font-[inter] text-sm cursor-pointer inline-block peer-checked:text-[#293264]",
                                    {
                                        "peer-checked:bg-[#D6DBF5] cursor-pointer" : !props.isChecked,
                                        "bg-[#94D7A2] cursor-not-allowed" : props.isChecked && isCorrect,
                                        "bg-[#f58e8e] cursor-not-allowed opacity-20": props.isChecked && isWrong,
                                        "opacity-50 cursor-not-allowed": props.isChecked && !isCorrect
                                    })
                                }
                                htmlFor={uniqueId}
                                >
                                    {option}
                                </label>
                            </div>
                    )})}
                    <hr className="text-[#DBDEF0] my-2" />
            </div>
            ))}
            {props.questionsList.length > 0 && (
                <div className="w-full mt-6 flex items-center justify-center">
                {!props.isChecked ?(
                    <button 
                    className="border rounded-xl text-[#F5F7FB] bg-[#4D5B9E] px-8 py-4 font-[inter] tracking-wide text-xs font-semibold cursor-pointer"
                    onClick={props.checkAnswer}
                        >
                        Check Answers</button>) :( 
                            <div className="mt-8 flex items-center justify-center">
                                <span className="text-[#293264] font-bold mr-4">You scored {props.score}/5 correct answer</span>
                                <button 
                                className="border rounded-xl text-[#F5F7FB] bg-[#4D5B9E] px-8 py-2 font-[inter] tracking-wide text-xs font-medium cursor-pointer"
                                onClick={props.playAgain}
                                >
                                    Play Again
                                        </button>
                            </div> )}
            </div>)}
        </div>
    )
}

export default Questions
