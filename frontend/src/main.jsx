import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { MainContextProvider } from './store/MainContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>



    <RecoilRoot>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </RecoilRoot>

  </BrowserRouter>
  ,
)
