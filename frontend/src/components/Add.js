import React,{useState} from 'react'

export default function Add(props) {

    const [newTitle, setnewTitle] = useState('')


    const createNewTodo=()=>{
        console.log('createNewTodo');
         // {"title":"task 7","isCompleted": false}
           props.createFunc ({title: newTitle, isCompleted:false});
        // 
    }
    return (
        <div className='Add'>
            <input type="text" placeholder='Write new title here ... ' onChange={(e)=>{
                setnewTitle(e.target.value)

            }} />
            <button onClick={createNewTodo}>Create New Todo</button>
            
        </div>
    )
}
