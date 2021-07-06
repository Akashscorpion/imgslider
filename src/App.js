import React,{useState,useEffect} from 'react'
import Panel from './component/singuppanel'
import Login from './component/Loginpanel'
import Welcome from './component/welcome'
import ImgSlider from './component/imgeSlider'
import './App.css';

function App() {
  const [option, setOption] = useState(0);
  const [login, setlogin] = useState(0);
  const [userInfo, setuserInfo] = useState([]);


  useEffect(() => {
    if(localStorage.getItem('Active'))
  {
    const userid=localStorage.getItem('Active')
    console.log(userid);
    setuserInfo(JSON.parse(localStorage.getItem(userid)))
    setlogin(1);
  }
  }, [])


  const optionFn=()=>{
    setOption(1)
  }
  const optionFn1=()=>{
    setOption(0)
  }

  const logoutfn=()=>{
    console.log("Logout");
    localStorage.removeItem('Active')
    setlogin(0)
    setOption(0)
}

const loginMain=(userid)=>{
  setuserInfo(JSON.parse(localStorage.getItem(userid)))
  localStorage.setItem('Active',userid)
  setlogin(1);
}


  const reg=(useData)=>{
    if(useData.status=="User created")
    setTimeout(() => {
      optionFn1()
    }, 5000);
  }
  return (
    <div className="App">
      { login==0 ? 
        (<div className=''>
			<header>
				<div className={'header-headings ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')) }>
				
        <span className={option==1 && 'active'} onClick={optionFn}>Create an account</span>
      	<span className={option ==0 &&  'active'} onClick={optionFn1}>Sign in to your account</span>
				
				</div>
			</header>
      <div id='panel'>

      {option ==1?(<Panel reg={reg} />):(<Login loginMain={loginMain}/>)}
      </div>
		    

		</div>):<>
    <Welcome logoutfn={logoutfn} userL={userInfo.lastName} userF={userInfo.firstName}/>
    <ImgSlider userL={userInfo.lastName} userF={userInfo.firstName}/> </>
    }
    </div>
  );
}

export default App;
