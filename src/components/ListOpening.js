import Opening from './Opening'
export default function ListOpening(props){

    return(
        <div className="list-opening">
        {
          props.list.map((open, index)=>{
            // console.log(index, props.list.length-1)
            return <Opening latest={index>=props.list.length-1?true:false} key={index} savefunc={props.savefunc} delfunc={props.delfunc} id={index} data={open}/>
          })
        }
      </div>
    )
}