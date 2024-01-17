import React, { useEffect, useState } from 'react'
import categories from '../../categories'
import QuestionCard from '../Components/questionCard';

const QuizPage = ({categoryId,quizQuestions,setQuizQuestions}) => {

    const [categoryText,setCategoryText] = useState("");
    const [isSubmitted,setIsSubmitted] = useState(false);

    useEffect(()=>{
        for(let i=0;i<categories.length;i++){
            if(categories[i].id===categoryId){
                setCategoryText(categories[i].category);
                break;
            }
        }
    },[])

    const handleSubmit = (event)=>{
        event.preventDefault();
        let userAnswers = [];
        let multiplicationFactor = quizQuestions[0].type==="multiple" ? 4 : 2;
        for(let i=0;i<quizQuestions.length*multiplicationFactor;i++){
            if(event.target[i].checked===true){
                userAnswers.push(event.target[i].value);
            }
        }

        const newQuizQuestions = quizQuestions.map((item,index)=>{
            return {
                ...item,
                "user_answer" : userAnswers[index],
                "correct": userAnswers[index]===item.correct_answer,    
            }
        })
        setQuizQuestions(newQuizQuestions);
        setIsSubmitted(true);
    }

    const totalScore = ()=>{
        let sum = 0;
        for(let i=0;i<quizQuestions.length;i++){
            if(quizQuestions[i].correct){
                sum = sum + 1;
            }
        }
        return sum;
    }

  return (
    <>
    {isSubmitted===false ? <div className='flex flex-col  m-2'>
        <h1 className='text-2xl font-semibold'>{categoryText}</h1>
        <form onSubmit={handleSubmit}>
            {quizQuestions.map((item,i)=>{
            return <QuestionCard key={i} questionIndex={i} item={item}/>
            })}
            <div className='flex justify-center'>
                <button className='border-2 border-blue-500 rounded-lg p-2 text-blue-500 '>Submit</button>
            </div>
        </form>
    </div>: <>
            <div className='flex flex-col border-2 text-2xl items-center my-4'>
                <h1>Your score : {totalScore()}</h1>
            </div>

    </>}
    </>
  )
}

export default QuizPage