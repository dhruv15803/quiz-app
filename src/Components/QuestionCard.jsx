import React, { useEffect, useState } from 'react'

const QuestionCard = ({item,questionIndex}) => {

    const [answers,setAnswers] = useState([...item.incorrect_answers,item.correct_answer])

    const generateShuffledAnswers = ()=>{
        let tempArr = [...answers];
        let randIndex = Math.floor(Math.random()*tempArr.length);
        let temp = tempArr[tempArr.length-1];
        tempArr[tempArr.length-1] = tempArr[randIndex];
        tempArr[randIndex] = temp;
        setAnswers(tempArr);
    }

    useEffect(()=>{
        generateShuffledAnswers();
    },[])

  return (
    <div className='border-2 m-2 rounded-lg shadow-lg p-2'>
        <div className='flex flex-wrap my-2 font-semibold'>
            {item.question}
        </div>

        <div className='flex gap-2 flex-col'>
            {answers.map((val,index)=>{
                return <div className='flex items-center gap-1' key={index}>
                <label htmlFor="answer">{val}</label>
                <input value={val} type="radio" name={`answer-${questionIndex}`} id=""/>
                </div>
            })}
        </div>
    </div>
  )
}

export default QuestionCard