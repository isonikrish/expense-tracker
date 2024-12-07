import axios from 'axios';
import { createContext, useEffect } from 'react'
import { useSetRecoilState } from 'recoil';
import { isUserThere, user } from './atoms/auth';

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
    const setUser = useSetRecoilState(user);
    const setIsUserThere = useSetRecoilState(isUserThere)
    async function fetchMe() {
        try {
            const response = await axios.get('http://localhost:9294/api/auth/me', {
                withCredentials: true,
            });

            if (response.status === 200) {

                setUser(response.data)
                setIsUserThere(true)
            }

        } catch (error) {

            setUser(null)
        }
    }
    useEffect(()=>{
        fetchMe()
    },[])

    return (
        <MainContext.Provider value={{fetchMe}}>
            {children}
        </MainContext.Provider>
    )
}