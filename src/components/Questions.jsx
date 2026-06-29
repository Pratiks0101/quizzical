
const Questions = (props) => {
    // console.log(props.questionsList)
    return (
        <div>
            {props.questionsList.length === 0 
                ? <h1>Loading Question...</h1> 
                : props.questionsList.map((question, qindex) =>  (
            <div className="max-w-100">
                <h3 className="text-[#293264] font-bold my-1" key={qindex}>{(question.questions)}</h3>
                
                    {question.all_options.map((option, optIndex) => (
                        <label key="optIndex">
                        <input 
                        type="radio" 
                        name={`question-${qindex}`}
                        value={option}
                        />
                        {option}
                        </label>
                    ))}
                    <hr className="text-[#DBDEF0] my-2" />
            </div>
            ))}
        </div>
    )
}

export default Questions
