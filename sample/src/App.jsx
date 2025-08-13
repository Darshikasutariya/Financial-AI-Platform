import { useState } from 'react'
import useTheme from './hooks/useTheme'
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home'
import SignInPage from './Pages/SignInPage'
import SignUpPage from './Pages/SignUpPage'
import DashBoard from './Pages/DashBoard'
import AccountDetail from './components/accountdetail'
import AddTransactionPage from './components/addtransactionpage'
import './index.css'
import Header from './components/Header';

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/SignInPage" element={<SignInPage isDark={isDark} />} />
        <Route path="/SignUpPage" element={<SignUpPage isDark={isDark} />} />
        <Route path="/Dashboard" element={<DashBoard isDark={isDark} />} />
        <Route path='/accounts/:name' element={<AccountDetail isDark={isDark} />} />
        <Route path='/accounts/:name/AddTransaction' element={<AddTransactionPage isDark={isDark} />} />
      </Routes>
    </>
  )
}

export default App
