import './style.css';
import Card from '../../components/Card';
import React, {useState, useEffect} from 'react';

function Home() {

  const [studentName,setStudentName] = useState();
  const [students, setStudents] = useState([])
  const [user,setUser] = useState({ name: '', avatar:''});
  
  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br",{
        hour: '2-digit',
        minute:'2-digit',
        second: '2-digit',
      })
    }
    setStudents(prevState => [...prevState,newStudent]);
  }

useEffect(() =>{
  async function fetchData(){
    const response = await fetch('https://api.github.com/users/felipefernandes1324')
    const data = await response.json()
    setUser({
      name: data.name,
      avatar: data.avatar_url
    })
  }
  fetchData()
},[])

  return(

  <div className="container">
  <header>
    <h1>Lista de Presença</h1>
    <strong>{user.name}</strong>
    <img src={user.avatar} /></header>
  <input 
  type="text" 
  placeholder="digite o nome"
  onChange={e => setStudentName(e.target.value)}/>
  <button 
  type="button"
  onClick={handleAddStudent}>
    Adicionar
    </button>
  {
  students.map(student => 
  <Card 
  keys={student.time}
  name={student.name} 
  time={student.time}
  /> 
  )
  }
</div>



)

}

export default Home
