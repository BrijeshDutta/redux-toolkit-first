import React, {useState , useEffect} from 'react'
import { useAppSelector,useAppDispatch } from '../../../app/hooks';
import {selectStatus, loginUser, selectUserDetails, userRegister} from './logonSlice';
import { User } from "./model";
function Login() {

    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectUserDetails)
    

    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');


    useEffect(() =>{

        console.log('Initial User State', user)


    }, [user, status])
    return (
        <div>
            Login
            <div>

            <input 
                name='email' 
                placeholder='Email'
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}/>

            <p>{userEmail}</p>
            <input 
                type="password" 
                name='password' 
                placeholder='Password'
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}/>
            </div>
            <div>
                <button type="submit" onClick={() => {

                    const newUser:User = {
                        email:userEmail,
                        password:userPassword
                    }
                    dispatch(loginUser(newUser))

                }}>Login</button>


            </div>
            <div>
            <div>
                <button type="submit" onClick={() => {

                    const newUser:User = {
                        email:'brijeshdtt@gmail.com',
                        username: 'brijeshdtt',
                        password:'brijeshdtt'
                    }
                    dispatch(userRegister(newUser))

                }}>Register</button>


            </div>
            </div>
            {status === 'failed' && (<div>failed to login </div>)}
            {status === 'loading' && (<div>Loading.... </div>)}
            {user.username? <div>{user.username}</div>:<div>Not Logged in </div>}
            
        </div>
    )
}

export default Login
