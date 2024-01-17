import React from 'react'
import categories from '../../categories.js'
import QuizPage from './QuizPage.jsx'

const Home = ({formData,handleChange,fetchQuestions,quizQuestions,setQuizQuestions}) => {
  return (
    <>
    {quizQuestions===null ? <form onSubmit={fetchQuestions} className='flex flex-col p-2  m-4 rounded-lg shadow-xl border-2 my-40'>
        <input className='border-2 rounded-lg my-2 p-2' value={formData.amount} onChange={handleChange} type="number" name="amount" id="amount" placeholder='Enter no of questions'/>
        <select className='border-2 rounded-lg my-2 p-2' value={formData.difficulty} onChange={handleChange} name="difficulty" id="">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        <select className='border-2 rounded-lg my-2 p-2' value={formData.type} onChange={handleChange} name="type" id="">
            <option value="multiple">MCQ's</option>
            <option value="boolean">True/false</option>
        </select>
        <select className='border-2 rounded-lg my-2 p-2' value={formData.category} onChange={handleChange} name="category" id="">
            {categories.map((item,index)=>{
                return <option key={index} value={item.id}>{item.category}</option>
            })}
        </select>
        <button className='border-2 border-blue-500 text-blue-500 rounded-lg my-4 w-1/2 mx-auto'>Start quiz</button>
    </form>: <QuizPage categoryId={formData.category} quizQuestions={quizQuestions} setQuizQuestions={setQuizQuestions}   />}
    </>
  )
}

export default Home