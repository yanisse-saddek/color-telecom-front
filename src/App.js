import Navbar from './components/Navbar'
import ContentTop from './components/ContentTop'
import Opening from './components/Opening'
import MiniNav from './components/MiniNav'
import FooterInfo from './components/FooterInfo'
import {useEffect, useState} from 'react'
import MultiRangeSlider from './components/MultiRangeSlider';
import './App.css';
import ListOpening from './components/ListOpening';
import axios from "axios"

function App() {
    const [listOpening, setListOpening] = useState([])
    const [existBd, setExistBd] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [miniNav, toggleNavbar] = useState(false)

useEffect(()=>{
    getData()
    function handleResize() {
      setWindowWidth(window.innerWidth) 
      console.log(windowWidth)
}
    window.addEventListener('resize', handleResize)

},[])

const getData = ()=>{
  axios.get('https://color-telecom-back.herokuapp.com/openings').then(data=>{
      if(data.data[0]){
        setExistBd(true)
        setListOpening(JSON.parse(data.data[0].horaires));
      }else{
        setExistBd(false)
      }
    })
}
const addOpening = ()=>{
    let newOpen = [...listOpening]; 
    newOpen.push([
      {day:"Lundi", isActive:true},{day:"Mardi", isActive:true},
      {day:"Mercredi", isActive:true},{day:"Jeudi", isActive:true},
      {day:"Vendredi", isActive:true},{day:"Samedi", isActive:false},
      {day:"Dimanche", isActive:false},{start:16,end:33, id:listOpening.length}
    ])
  setListOpening(newOpen)
}

const saveData = (num, data, reset)=>{
    let saveData = [...listOpening]; 
      if(reset){
        saveData[num] =[
          {day:"Lundi", isActive:true},{day:"Mardi", isActive:true},
          {day:"Mercredi", isActive:true},{day:"Jeudi", isActive:true},
          {day:"Vendredi", isActive:true},{day:"Samedi", isActive:false},
          {day:"Dimanche", isActive:false},{start:16,end:33}
        ]
      }else{
        saveData[num] = data
      }
      setListOpening(saveData)
}
const saveToDB = ()=>{
  console.log(listOpening)
  if(existBd){
    axios.put('https://color-telecom-back.herokuapp.com/openings', listOpening).then(ok=>{
      getData()
      console.log('ca a fais le put')
    })
  }else{
    axios.post('https://color-telecom-back.herokuapp.com/openings', listOpening).then(ok=>{
      getData()
      console.log('"ca fais le post')
    })
  }
}
const deleteData = (index)=>{
    let data = listOpening
    data = data.pop()
    console.log(data)
    // setListOpening(data)
    saveToDB()  
}
const toggleNav = ()=>{
  {
    miniNav?
    toggleNavbar(false)
  :
    toggleNavbar(true)
  }
}

  return (
    <div className="app">
      {
        windowWidth>650?
        <Navbar/>
        :null
      }
      {
        miniNav?
        <MiniNav  toggleNavbar={toggleNav}  />
        :null
      }
        <div className="content" style={{marginLeft:windowWidth>650?"20%":"0"}}>
            <ContentTop wWidth={windowWidth} toggleNavbar={toggleNav} />
            <div className="content-info">
                <div className="list-top">
                    <p>Horaire d'ouverture</p>
                    <div className="selector">
                        <p>Fuseau horaire</p>
                        <select name="" id="">
                            <option value="Paris">Paris</option>
                            <option value="Londres">Londres</option>
                            <option value="Moscou">Moscou</option>
                            <option value="Kaboul">Kaboul</option>
                            <option value="HongKong">Hong Kong</option>
                            <option value="Sydney ">Sydney </option>
                            <option value="NewYork ">New York </option>
                        </select>
                    </div>
                </div>
                <ListOpening list={listOpening} delfunc={deleteData} savefunc={saveData}/>
                <div className="add-opening">
                    <p onClick={addOpening} className="add-btn"> + Ajouter un nouveau créneaux</p>
                    <p onClick={saveToDB} className="save-btn">Enregistrer</p>
                </div>
            </div>
                <FooterInfo/>
        </div>
      </div>
  );
}

export default App;
