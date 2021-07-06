import React,{useState,useEffect} from 'react'

function Login(props) {

	const [err, seterr] = useState("")
	const [otpValidation, setotpValidation] = useState("0");
	const [loginValidation, setloginValidation] = useState("");


	useEffect(() => {
		var queriesFromStorage = JSON.parse(localStorage.getItem("6768"));
		console.log(queriesFromStorage);
	},[loginValidation])




	const loginHandler=(e)=>{
		e.preventDefault();
       
        let loggedDetails=e.target.mob.value;
        e.target.mob.value="";
     
       if((Number(loggedDetails)!=NaN && loggedDetails.length==10) )
       {
		   if(JSON.parse(localStorage.getItem(loggedDetails))){
		   console.log("user Exists");

          setotpValidation(1)
		  setloginValidation(loggedDetails)
		}
		else
		seterr("User Doesn't Exists");
    }
    else
    seterr("Invalid mobile Number");
        
    }

	const otpValidator=(e)=>{
        e.preventDefault();
        let loggedDetails=e.target.otp.value;
        e.target.otp.value="";


        if(loggedDetails.length==4  && loggedDetails== (Number('0000'))){
            
			props.loginMain(loginValidation);
		}
	}
    return (
        <div>
           <div className='container'>
		   <div>
		  <form onSubmit={otpValidation==1 ?otpValidator:loginHandler}>
		<div className='signin'>
		{ otpValidation==0? 
		(<input id='mob' name='Mobile' type='tel' placeholder='Enter your mobile number' onChange={()=>seterr("")} required />)
    	:(<input id='otp' name='otp' type='otp' placeholder='Please Enter the otp.' onChange={()=>seterr("")} required /> )
              }
              {err && <p style={{color:'red'}}>{err}</p>}
              <br/>
		</div>
		<input className='btn-submit-form' type='submit'  value={otpValidation==0?'Get otp':'Login'}/>
			
	</form>

	</div>
			
		</div> 
        </div>
	)
}

export default Login
