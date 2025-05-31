import React from 'react'
import {FaAngleLeft,FaAngleRight} from 'react-icons/fa'

function card(props) {

    let review=props.review;
  return (
    <div>
        <div>
            <img src={review.src}/>
        </div>
        <div>
            <p>{review.name}</p>
        </div>
        <div>
            <p>{review.job}</p>
        </div>
        <div>
            <FaAngleLeft/>
        </div>
        <div>
            {revirew.test}
        </div>
    </div>
  )
}

export default card
