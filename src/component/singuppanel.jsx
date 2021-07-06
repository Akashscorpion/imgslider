import React,{useState,useEffect} from 'react'

function Panel(props) {

    const [otpVer, setotpVer] = useState(true)
    const [err, seterr] = useState("")
    const [otpValidation, setotpValidation] = useState("0");
    const [userInfo, setuserInfo] = useState([
        {
            mobile:"",
            firstName:"",
            lastName:"",
            email:"",
            tempData:"",
            status:""
        }
    ])

    useEffect(() => {
        props.reg(userInfo)
        localStorage.setItem(userInfo.mobile,JSON.stringify(userInfo));
    }, [userInfo.status])

    const signUpVal=(e)=>{
        e.preventDefault();
       
        let loggedDetails=e.target.mob.value;
        e.target.mob.value="";
     
       if((Number(loggedDetails)!=NaN && loggedDetails.length==10) )
       {
           if(!JSON.parse(localStorage.getItem(loggedDetails))){
        setuserInfo({tempData:loggedDetails})
          setotpValidation("1");
           }
           else
           seterr("User Already exists");
    }
    else
    seterr("Invalid mobile Number");
        
    }

    const otpValidator=(e)=>{
        e.preventDefault();
        let loggedDetails=e.target.otp.value;
        e.target.otp.value="";


        if(loggedDetails.length==4  && loggedDetails== (Number('0000'))){
            console.log("succesful")
            setuserInfo({...userInfo,mobile:userInfo.tempData})
            //setuserInfo({...userInfo,tempData:""})
                setotpVer(false)
          }
          else {
              seterr("Invalid otp");
          }
    }

    async function abc(e){
            e.preventDefault();
           
            let fname=e.target.fname.value;
            e.target.fname.value="";
           e.target.lname.value="";
            let lname=e.target.lname.value;
            e.target.email.value="";
            let email=e.target.email.value;

            setuserInfo({...userInfo,firstName:fname,lastName:lname,email:email,status:"User created"})
      }

    return (
        <div>
             
                 {otpVer  ? (
                <form onSubmit={otpValidation==1 ?otpValidator:signUpVal}>
              { otpValidation==0? (<input id='mob' name='Mobile' type='tel' placeholder='Enter your mobile number' onChange={()=>seterr("")} required />)
              :(<input id='otp' name='otp' type='otp' placeholder='Please Enter the otp.' onChange={()=>seterr("")} required /> )
              }
              {err && <p style={{color:'red'}}>{err}</p>}
              <br/>
              <input className='btn-submit-form' type='submit'  value={otpValidation==0?'Get otp':'Verify'}/>
              </form>
              ) : 
              
              (<form onSubmit={abc}>
                  {userInfo.status=="User created" && <h2>User Created Succesfully,Redirecting to login page</h2>}
			<div className='signup'>
				<input id='fname' name='fname' type='text' placeholder='First-Name' required /> <br/>
				<input id='lname' name='lname' type='text' placeholder='Last-Name'  /> <br/>
				<input id='email' name='email' type='email' placeholder='Email Id' /> <br/>
			</div>
			<input className='btn-submit-form' type='submit'  value='Sign up'/>
				
		</form>)
        }
        </div>
    )
}


export default Panel;