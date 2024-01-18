import Header from "./Components/Header"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./Pages/Home"
import { useState } from "react";
import axios from "axios";

function App() {

  const [formData,setFormData] = useState({
    "amount":10,
    "difficulty":"easy",
    "type":"multiple",
    "category":9,
  });

  const [quizQuestions,setQuizQuestions] = useState(null);
  const [isLoader,setIsLoader] = useState(false);
  const [isFetchInitiated,setIsFetchInitiated] = useState(false);
  const [isFetchError,setIsFetchError] = useState(false);
  const [questionsPerPage,setQuestionsPerPage] = useState(5);
  const [currentPage,setCurrentPage] = useState(1);



  const handleChange = (event)=>{
    const {name,value} = event.target;
    setFormData(prevFormData=> {
      return {
        ...prevFormData,
        [name]:value,
      }
    })
  }

  const fetchQuestions = async  (event)=>{
    try {
      setIsLoader(true);
      setIsFetchInitiated(true);
      event.preventDefault();
      const response = await axios.get(`https://opentdb.com/api.php?amount=${formData.amount}&difficulty=${formData.difficulty}&type=${formData.type}&category=${formData.category}`);
      const data = response.data.results;
      setQuizQuestions(data); 
      setIsLoader(false); 
    } catch (error) {
      setIsFetchError(true);
      console.log(error);
    }
  }


  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home formData={formData} handleChange={handleChange} fetchQuestions={fetchQuestions} quizQuestions={quizQuestions} setQuizQuestions={setQuizQuestions} isLoader={isLoader} isFetchInitiated={isFetchInitiated} setIsFetchInitiated={setIsFetchInitiated} isFetchError={isFetchError}/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
