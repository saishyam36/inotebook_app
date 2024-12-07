import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'


// ToDo: add star rating to the user database and show stars if user logged in again make backend & front end changes respectively
const StarRating = (props) => {
    const { noOfStars } = props
    const [rating,setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick= (getCurentIndex)=>{
        setRating(getCurentIndex)
        console.log(getCurentIndex)
    }
    
    const handleMouseMove= (getCurentIndex)=>{
        setHover(getCurentIndex)
        
    }
    
    const handleMouseLeave= ()=>{
        setHover(rating)
        
    }
    
    return (
        <div className='star-rating'>
            {
                [...Array(noOfStars)].map((_,index)=>{
                    index+=1;
                    return <FaStar
                    className={index<=(hover|| rating)? 'active':'inactive'}
                    key={index}
                    onClick={()=>handleClick(index)}
                    onMouseMove={()=>handleMouseMove(index)}
                    onMouseLeave={()=>handleMouseLeave(index)}
                    size={50}/>
                })
            }

        </div>
    )
}

export default StarRating