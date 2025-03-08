import "./index.css"
import {useState} from "react";

function App() {

  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Number of times clicked: {count}</p>
      <button onClick={() => {
        setCount((prevCount) => prevCount +1)
      }}>Click Me</button>
    </div>
  )
}

export default App
