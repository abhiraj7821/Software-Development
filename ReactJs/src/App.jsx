import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import { RiMenu4Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function App() {



  useGSAP(()=>{
    const tl=gsap.timeline()
    
    // tl.from("h2",{
    //   opacity:0,
    //   duration:1,
    //   y:-30
    // })
    // tl.from("h4",{
    //   opacity:0,
    //   duration:0.5,
    //   y:-30,
    //   stagger:1,
    // })
    // tl.from(".page1 h1",{
    //   opacity:0,
    //   duration:0.5,
    //   y:20,
    //   scale:0.2,
    // })

    
  gsap.to(".page2 h1",{
      transform:"translateX(50%)",
      scrollTrigger:{
        trigger:".page2 ",
        scroller:"body",
        start:"top 0%",
        end:"top -150%",
        scrub:2,
        pin:true
      }
    })

},[])

  const finalPath="M 10 100 Q 650 100 1290 100"
  const handleClick=(event)=>{
    console.log(event.pageY);
    
    console.log(event);
    const path=`M 10 100 Q ${event.pageX} ${(event.pageY)-3000} 1290 100`
    gsap.to(".page3 svg path",{
      attr:{d:path}
    })
  }

  const handleLeave=(event)=>{
    gsap.to(".page3 svg path",{
      attr:{d:finalPath},
      duration:0.5,
      ease:"elastic.out"
    })
  }

  const handleCursorMove=(event)=>{
    gsap.to((".cursor"),{
      duration:1,
      x:event.pageX,
      y:event.pageY,
      ease:"expo"
    })
  }

  const cursor=document.querySelector(".cursor")

  const handleImageMouseIn=(event)=>{
    console.log("cursor enter");
    cursor.innerHTML="view More"
    gsap.to(cursor,{
      scale:2,
    })
  }


  const handelImageMouseLeave=(event)=>{
        console.log("cursor leave");
    cursor.innerHTML=""
    gsap.to(cursor,{
      scale:1,
      
    })
  }





  return (
      <div className='body h-[100vh] w-[100%]' onMouseMove={handleCursorMove}>
        
        <div className="cursor h-[50px] w-[50px] sticky bg-white rounded-full flex items-center justify-end text-[0.8rem] z-9" >
        </div>
         
        <div className="page1 h-[100%] w-[100%]  bg-black text-white font-semibold ">
          <div className="nav flex justify-between p-[2rem]">
            <h2>sheyriens</h2>
            <div><RiMenu4Line/></div>
          </div>
            <div className="navItems flex flex-col justify-center pl-[5rem] text-5xl font-bold gap-2 mr-[2rem] h-[100%] w-[40%] bg-white  text-black absolute top-0 right-[-42%] z-10 overscroll-x-none">
              <h4>Work</h4>
              <h4>About</h4>
              <h4>Cources</h4>
              <h4>Blog</h4>
              <RxCross2 className="absolute top-[10px] right-2.5"/>
            </div>
          <div className="heading flex w-[100%] justify-center items-center absolute top-[50%] text-6xl"><h1>Sheryians Codeing School</h1></div>
        </div>

        <div className="imagediv h-[100%] w-[100%] bg-black flex justify-center items-center relative" >
          <div className="overlay h-[50vh] w-[90vh] bg-red-500 absolute opacity-20 z-10" onMouseEnter={handleImageMouseIn} onMouseLeave={handelImageMouseLeave} ></div>
          <img className='h-[50vh] w-auto' src="https://images.unsplash.com/photo-1715772973269-0f51a170ed74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI3fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D" alt="" />
        </div>

        <div className="page2 bg-yellow-300 h-fit overflow-x-hidden flex justify-center items-center ">
          <h1 className='text-[40rem] p-0 font-bold'>Experience</h1>
        </div>
{/* 
        <div className="page3 h-[20vh] bg-black flex justify-center text-center"  onMouseMove={handleClick} onMouseLeave={handleLeave}>
          <svg height="500" width="1300">
            <path d="M 10 100 Q 650 100 1290 100" stroke='white' fill='transparent' />
          </svg>
        </div> */}

        
        <div></div>

      </div>
  );
}

export default App;
