import React, { useState } from 'react'

const DropArea = ({onDrop}) => {
    const [showDrop, setShowDrop] = useState(false)
  return (
    <section 
    onDragEnter={()=>setShowDrop(true)} 
    onDragLeave={()=>setShowDrop(false)} 
    onDrop={()=>{
        onDrop(),
        setShowDrop(false);
    }}
    onDragOver={(e)=>e.preventDefault()}
    className={showDrop ? 'my-4 p-2 border border-gray-950/40 transition-all ease-in-out duration-700 shadow-[5px_5px_10px_black]' : 'opacity-0'}> 
        Drop here   
    </section>
  )
}

export default DropArea
