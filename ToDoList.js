import React, { useState, useEffect } from 'react'
import './todolist.css'





const readData = () => {
    const td = localStorage.getItem('todo')
    if (td) {
        return JSON.parse(td)
    } else {
        return []
    }
}

function ToDoList() {

    const [data, setData] = useState(readData())
    const [title, setTitle] = useState('')
    const [des, setDes] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [idx, setIdx] = useState(0)



    useEffect(() => {
        const update = JSON.stringify(data)
        localStorage.setItem('todo', update)
    }, [data])


    const add = () => {

        if (isEdit) {
            // console.log(idx);
            data.splice(idx,1,{ title: title, des: des })
            setData([...data])

            setIsEdit(false)
        } else {
            setIsEdit(false)
            setData((pre) => [...pre, { title: title, des: des }])
        }
    }

    const dte = (i) => {
        data.splice(i, 1)
        setData([...data]);
        // const arr = data.filter((v,idx)=> idx!=i)
        // setData(arr)
    }

    const clr = () => {
        setData([])
    }

    const rst = () => {
        setTitle('');
        setDes('')
    }


    return (
        <div className='main'>
            <div className='input'>
                <span>Title:</span><br />
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input><br /><br />
                <span>Description:</span><br />
                <input type='text' value={des} onChange={(e) => setDes(e.target.value)}></input><br /><br />
                <button className='btn' onClick={()=>add()}>{isEdit ?'update Item' : 'add item'}</button>
                <button className='btn' onClick={clr}>clear item</button>
                <button className='btn' onClick={rst}>reset item</button><br /><br />
            </div><br /><br />


            <div className="flex">

                {
                    data.map((val, i) => {
                        return (
                            <div key={i} className='output'>
                                <h5>Title:{val.title}</h5>
                                <h5>Description:{val.des}</h5>
                                <button className='edit' onClick={()=>{setIdx(i); setIsEdit(true); setTitle(data[i].title); setDes(data[i].des)}} >Edit</button>
                                <button className='dltbtn' onClick={() => dte(i)}>delete</button>
                            </div>
                        )
                    })
                }
            </div>

        </div>



    )
}

export default ToDoList



// import { useState } from "react"
// function ToDoList(){

//     const [data,SetData]=useState([])
//     const [title,SetTitle]=useState('')
//     const [des,SetDes]=useState('')

// const add=()=>{
//     SetData((pre)=>[...pre,{title:title,des:des}])
//     console.log(data);
// }
    
//     return(
//         <>
//         <span>Title</span>
//         <input type='text'  onChange={(e)=>SetTitle(e.target.value)}></input><br/>
//         <span>Description</span>
//         <input type='text'  onChange={(e)=>SetDes(e.target.value)}></input><br/>
//         <button onClick={add}>submit</button>


// {
//     data.map((val,i)=>{
//         return <div key={i}>
//         <h1>title:{val.title}</h1>
//         <h1>descriptiion:{val.des}</h1>
//         </div>
//     })
// }


//         </>
//     )
// }
// export default ToDoList