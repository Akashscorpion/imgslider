import React from 'react'

function welcome(props) {


    return (
        <div>
            <header>
				<div >
				
        <span className='active' >Welcome {props.userF+" "+props.userL}</span>
        	<span className='active' onClick={props.logoutfn} >Logout</span>
				
				</div>
			</header>
      <div id='panel'>

     
      </div>
        </div>
    )
}

export default welcome
