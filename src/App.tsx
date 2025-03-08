import "./index.css"
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";

function App() {

  const [count, setCount] = useState(0);

  return (
    <div className={"bg-slate-300"}>
      <p>Number of times clicked: {count}</p>
      <Button onClick={() => {
        setCount((prevCount) => prevCount +1)
      }}>Click Me</Button>

    </div>
  )
}

export default App
