import React, { useEffect, useState } from 'react'
import categories from '../../categories'
import QuestionCard from '../Components/questionCard';
import { Link } from 'react-router-dom';

const QuizPage = ({categoryId,quizQuestions,setQuizQuestions,setIsFetchInitiated,currentQuestions}) => {

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

    const totalQuestionsAttempted = ()=>{
        let questionsAttempted = 0;
        for(let i=0;i<quizQuestions.length;i++){
            if(quizQuestions[i].user_answer!==undefined){
                questionsAttempted+=1;
            }
        }
        return questionsAttempted;
    }

    const goHomePage = ()=>{
        setIsFetchInitiated(false);
        setQuizQuestions(null);
    }

  return (
    <>
    {isSubmitted===false ? <div className='flex flex-col  m-2'>
        <h1 className='text-2xl font-semibold'>{categoryText}</h1>
        <div className='mx-2'>
        <button onClick={goHomePage} className='text-blue-500'> ← Back</button>
        </div>
        <form onSubmit={handleSubmit}>
            {quizQuestions.map((item,i)=>{
            return <QuestionCard key={i} questionIndex={i} item={item}/>
            })}
            <div className='flex justify-center'>
                <button className='border-2 border-blue-500 rounded-lg p-2 text-blue-500 '>Submit</button>
            </div>
        </form>
    </div>: <>
            <div className='flex flex-col text-2xl items-center mt-40'>
                <h1>Your score : {totalScore()}</h1>
                <p>Questions attempted: {totalQuestionsAttempted()}/{quizQuestions.length}</p>
            </div>
            <div className='flex justify-center my-2'>
                <button onClick={()=>window.location = '/'} className='border-2 border-blue-500 rounded-lg p-2 text-blue-500'>Play again</button>
            </div>
    </>}
    </>
  )
}

export default QuizPage