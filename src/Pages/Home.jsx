import React from 'react'
import categories from '../../categories.js'
import QuizPage from './QuizPage.jsx'
import pencilImg from '../Images/pencilImg.jpg'
import Loader from '../Components/Loader.jsx'

const Home = ({formData,handleChange,fetchQuestions,quizQuestions,setQuizQuestions,isLoader,isFetchInitiated,setIsFetchInitiated,isFetchError}) => {

  return (
    <>
    {isFetchInitiated===false ?  <>
    <div className='m-4 flex justify-center items-center'>
        <img className='w-44' src={pencilImg} alt="" />
        <p className='font-thin'>Test yourself on topics ranging from General knowledge, entertainment to science,politics,art,history</p>
    </div>
    <form onSubmit={fetchQuestions} className='flex flex-col p-2  m-4 rounded-lg shadow-xl border-2'>
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
    </form>
    </>: isLoader ? <>
    <div className='flex my-40 justify-center'>
        {isFetchError===false && <Loader/>}
        {isFetchError && <button onClick={()=>window.location='/'}>Try again</button>}
    </div>
    </>  :  
    <QuizPage categoryId={formData.category} quizQuestions={quizQuestions} setQuizQuestions={setQuizQuestions} setIsFetchInitiated={setIsFetchInitiated}/>}
    </>
  )
}

export default Home