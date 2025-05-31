import React from 'react';
import { useState } from 'react';

export default function MyComponent({props}) {
  const [InputValue, setInputValue] = useState("")

  const eventChange=(event)=>{
    setInputValue(event.value)
  }

  const buttonHandler=()=>{
    props.onData(InputValue);
  }

  const value=10;
  return (
    <>
      <input type="text" value={InputValue} onChange={eventChange} />
      <button onClick={buttonHandler}>Click Me</button>
    </>
  );
}
