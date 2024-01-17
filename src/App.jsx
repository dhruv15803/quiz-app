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
      event.preventDefault();
      const response = await axios.get(`https://opentdb.com/api.php?amount=${formData.amount}&difficulty=${formData.difficulty}&type=${formData.type}&category=${formData.category}`);
      const data = response.data.results;
      setQuizQuestions(data); 
  }


  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home formData={formData} handleChange={handleChange} fetchQuestions={fetchQuestions} quizQuestions={quizQuestions} setQuizQuestions={setQuizQuestions}/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
