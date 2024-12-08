import axios from 'axios';
import { createContext, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currencyAtom, isUserThere, user } from './atoms/auth';
import { toast } from 'react-hot-toast'
export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
    const setUser = useSetRecoilState(user);
    const setIsUserThere = useSetRecoilState(isUserThere);
    const [defaultCurrency, setDefaultCurrency] = useRecoilState(currencyAtom);

    
    async function fetchMe() {
        try {
            const response = await axios.get('http://localhost:9294/api/auth/me', {
                withCredentials: true,
            });

            if (response.status === 200) {
                setUser(response.data);
                setIsUserThere(true);
            }
        } catch (error) {
            setUser(null);
            setIsUserThere(false);
        }
    }

    // Initialize user
    useEffect(() => {
        fetchMe();
    }, []);

    function setCurrency(currency) {

        localStorage.setItem("selectedCurrency", JSON.stringify(currency));
        setDefaultCurrency(currency);
    }

    useEffect(() => {
        const storedCurrency = JSON.parse(localStorage.getItem("selectedCurrency")) || {
            value: 'USD',
            label: 'USD - United States Dollar ($)',
            symbol: '$',
        };
        setDefaultCurrency(storedCurrency);
    }, [setDefaultCurrency]);
    async function handleAddBalance(amount) {
        try {

            const res = await axios.put('http://localhost:9294/api/controls/add-balance', {amount}, {
                withCredentials: true
            });
            if (res.status === 200) {
                toast.success("Balance Updated")
                fetchMe()
            }
        } catch (error) {
            const errorMsg = error.response?.data?.msg || error.message || 'An error occurred';
            toast.error(errorMsg);
        }
    }

    async function handleAddTransaction(data){
       
        try {
            console.log(data)
            const res = await axios.post(' http://localhost:9294/api/controls/add-transaction', data, {
                withCredentials: true
            });
            if (res.status === 201) {
                toast.success("Transaction Added")
                
                fetchMe()
            }
        } catch (error) {
            const errorMsg = error.response?.data?.msg || error.message || 'An error occurred';
            toast.error(errorMsg);
        }
    }
    return (
        <MainContext.Provider value={{ fetchMe, setCurrency, handleAddBalance,handleAddTransaction }}>
            {children}
        </MainContext.Provider>
    );
};
