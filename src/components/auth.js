import React, { useState } from 'react';
import { auth, googleProvidr } from '../config/firebase'; 
import { createUserWithEmailAndPassword ,signInWithPopup, signOut} from 'firebase/auth';

export const  Auth = () => {

    const [email, setEmail] = useState('');
    const [passward, setPassward] = useState('');

    const signIn = async() =>{
        try{
            await createUserWithEmailAndPassword(auth, email, passward);
        } catch(err){
            console.error(err);
        }
    }

    const signInWithGoogle = async() =>{
        try{
            await signInWithPopup(auth, googleProvidr);
        } catch(err){
            console.error(err);
        }
    }

    const logout = async() =>{
        try{
            await signOut(auth);
        } catch(err){
            console.error(err);
        }
    }


    return (
        <div>
            <input  
                placeholder='Email'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                placeholder='Passward'
                onChange={(e) => setPassward(e.target.value)} 
                type='passward'
            />
            <button onClick={signIn}>Sing In</button>
            <button onClick={signInWithGoogle}>Sing In with Google</button>
            <button onClick={logout}>LogOut</button>
        </div>
    )
}