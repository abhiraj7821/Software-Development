import { useState ,useEffect} from 'react'
import prism from 'prismjs'
import Editor from 'react-simple-code-editor'
import axios from 'axios'
import markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'



import './App.css'
import Markdown from 'react-markdown'


function App() {
  const [count, setCount] = useState(0)
  const [code,setCode] = useState(`function sum(){
    return 1+1
  }`)
  const [loading, setLoading] = useState(false);

  const [review,serReview]=useState(``)

  useEffect(()=>{
    prism.highlightAll()
  },[])


  async function reviewCode() {
  setLoading(true);
  try {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code });
    serReview(response.data);
  } catch (error) {
    console.error('Review failed:', error);
  } finally {
    setLoading(false);
  }
}



  return (
   <>
   <div className="nav">
    <h1>C.</h1>
   </div>

   <div className="starting">
    <span>Write code. Regret nothing. We'll fix it.</span>
   </div>

   <main className='main'>
    <div className="left">

      <div className="code">
        <h4>Paste your code on the 👇</h4>
        <Editor
          value={code}
          onValueChange={code=>setCode(code)}
          highlight={code=>prism.highlight(code,prism.languages.javascript,"javascript")}
          padding={10}
          style={{
            fontFamily:'tabacoo',
            height:'90%',
            width:'100%',
            backgroundColor:'#4D243D',
            border:'1px solid #4D243D',
            borderRadius:"1rem"
          }
          }
        />
      </div>
      <div onClick={!loading ? reviewCode : null} className="review">
        {loading ? (
          <span className="loader">Reviewing...</span> // Replace with a spinner icon if you like
        ) : (
          'Review'
        )}
      </div>

    </div>
    <div className="right">
      <h4>Code Review 😮‍💨</h4>
      <div className="reviewedCode">
        <Markdown
        style={{
        }}
        rehypePlugins={[rehypeHighlight]}
      >{review}</Markdown>
      </div>
    </div>
   </main>
   </>
  )
}

export default App
