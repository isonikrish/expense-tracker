import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';
import { useRecoilValue } from 'recoil';
import { isUserThere } from '../store/atoms/auth';


function Authentication() {
  const [authMethod, setAuthMethod] = useState('login')
  const navigate = useNavigate();
  const userThere = useRecoilValue(isUserThere)
  useEffect(()=>{
    if(userThere){
      navigate('/')
    }
  },[userThere])

  
  return (
    <div>
      {authMethod === "signup" ? (
        <Signup setAuthMethod={setAuthMethod} />
      ) : (
        <Login setAuthMethod={setAuthMethod} />
      )}

    </div>
  )
}

export default Authentication