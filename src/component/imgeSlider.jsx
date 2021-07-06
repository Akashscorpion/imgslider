import React,{useState,useEffect} from 'react'

function ImgeSlider(props) {
  const [imgcounter, setimgcounter] = useState(0)
  const [imgDetails, setimgDetails] = useState("")
  const [keyPressed, setKeyPressed] = useState(false);
  const [rejectmsg, setRejectmsg] = useState(false);

    const [state, setState] = useState({
        img: [
            "http://getdrawings.com/free-icon-bw/one-icon-3.png",
            "http://getdrawings.com/free-icon-bw/free-shirt-icon-9.png",
            "http://getdrawings.com/free-icon-bw/serial-number-icon-19.png",
            "http://getdrawings.com/free-icon-bw/serial-number-icon-18.png",
            "http://getdrawings.com/free-icon-bw/number-one-icon-17.png"
        ],
        imgName: [
        "One",
        "Two",
        "Three",
        "Four",
        "Five"
        ]
      })
  
      useEffect(() => {
        if(keyPressed){
          console.log("Activity Recorded");
        }
        else{
          console.log("Activity Not Recorded");
          setInterval(() => {
            if((state.img.length-1)!==imgcounter){
            setimgcounter(prev=>prev+1)
            }
          }, 5000);
        }
        
      }, [keyPressed])

      useEffect(() => {
        if(!rejectmsg){
          setRejectmsg("");
        }
        
       // localStorage.setItem("img",(Number(imgcounter)));
        //console.log((state.img.length-1)+" "+imgcounter);
        if((state.img.length-1)===imgcounter){
          setimgDetails(state.imgName[imgcounter] + " : Hey! " +props.userF+" "+props.userL+" you have rated all the images. Thank You!")
        }
        else if((state.img.length-1)<imgcounter){
          setimgcounter(4)
        }
        else if(0>imgcounter ){
          setimgcounter(0)
        }
        else{
        if(rejectmsg){
          setimgDetails(" : Hey! " +props.userF+" "+props.userL+" you have rejected image :"+state.imgName[imgcounter] )
            setRejectmsg(false)
            setTimeout(() => {
              setimgDetails(state.imgName[imgcounter])
            }, 2000);
        }
          else{
            setimgDetails(state.imgName[imgcounter])
    }
  }
      }, [imgcounter])
     
      useEffect(() => {
        //  setimgcounter(Number(localStorage.getItem("img")))
      
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
    
        return () => {
          
          window.removeEventListener('keydown', downHandler);
          window.removeEventListener('keyup', upHandler);
        };
      }, []); 


      function downHandler({ key }) {
        if (key === 'ArrowRight') {
         
          handleNext()
        }
        else if(key === 'ArrowLeft'){
          handlePrev()
        }
      }
    
     
      const upHandler = ({ key }) => {
        if (key === 'ArrowLeft') {
           
          setKeyPressed(false);
        }
        else if(key === 'ArrowRight'){
          setKeyPressed(false);
          }
          
      };

     
      

  function handlePrev(e) 
  {
   
    setKeyPressed(true);
    if(imgcounter<=(state.img.length-1)){
      setRejectmsg(true)
    setimgcounter(prev=>prev-1);
   
    }
  }
 

 function handleNext(e) {
  setKeyPressed(true);
  if(imgcounter<=(state.img.length-1)){
    setimgcounter(prev=>prev+1);
    
    }
    }

    return (
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div >
          <button disabled={imgcounter === 0} onClick={handlePrev}>
            -
          </button>
        </div>
        <div className="cards">
          <img height="100px" width="100px" src={state.img[imgcounter]} />
        </div>
        <div>
          <button
            disabled={imgcounter === state.img.length - 1}
            onClick={handleNext} 
          >
            +
          </button>
        </div>

        {imgDetails && <><div><p>{" "+imgDetails}</p></div></> }
      </div>

    )
}

export default ImgeSlider
