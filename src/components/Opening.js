import {useState} from 'react'
import MultiRangeSlider from './MultiRangeSlider';

export default function Opening(props){
    const [minValue, set_minValue] = useState(props.data[7].start);
    const [maxValue, set_maxValue] = useState(props.data[7].end);
    const [days, setDays] = useState(props.data);

    const handleInput = (e) => {
    console.log(e)
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
    let newArr = [...days]; 
    newArr[7].start = e.minValue; 
    newArr[7].end = e.maxValue; 
    setDays(newArr)
    save()
};

const changeState = (num)=>{
        let newArr = [...days]; 
        if(newArr[num].isActive ){
            newArr[num].isActive = false; 
        }else{
            newArr[num].isActive=true
        }
        setDays(newArr);
        save()
}
const resetData = ()=>{
    set_minValue(16);
    set_maxValue(33);
    setDays([
        {day:"Lundi", isActive:true},{day:"Mardi", isActive:true},
        {day:"Mercredi", isActive:true},{day:"Jeudi", isActive:true},
        {day:"Vendredi", isActive:true},{day:"Samedi", isActive:false},
        {day:"Dimanche", isActive:false},{start:minValue,end:maxValue}
      ])
    save(true)
}
const deleteData = ()=>{
    console.log('ID DU TRUC A SUPPRIMER', props.id)
    props.delfunc(props.id)
}

const save = (reset)=>{
    console.log('save')
    props.savefunc(props.id,days, reset)
}
    return(
        <div className="opening">
        <div className="opening-left">
            <p>Jour d'ouverture</p>
            <div className="days">
                {
                    days.map((day, index)=>{
                        if(day.day){
                            return(
                                    <p onClick={()=>{changeState(index)}} key={index} className={day.isActive?"dot actif ":"dot inactif"}>{day.day[0]}</p>
                                )
                        }
                    })
                }
            </div>
            <p className="reset-msg" onClick={resetData}>Reinitialiser</p>
            {props.latest?
            <p className="delete-msg" onClick={()=>{deleteData()}}>Supprimer</p>
            :null
        }
            </div>
        <div className="opening-right">
            <p className="title">Horaires</p>
            <div className="wrapper">
                <MultiRangeSlider
                  min={0}
                  max={48}
                  step={1}
                  minValue={minValue}
                  maxValue={maxValue}
                  label={true}
                  preventWheel={false}
                  onInput={handleInput} 
                  onChange={handleInput}/>
            </div>
        </div>
    </div>
    )
}