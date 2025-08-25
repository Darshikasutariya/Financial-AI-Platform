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
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ContentManagement from './Pages/Admin/ContentManagement';
import FinancialDataManagement from './Pages/Admin/FinancialDataManagement';
import UserManagement from './Pages/Admin/UserManagement';

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`${isDark ? 'dark' : ''} transition-colors duration-300`}>
      <Routes>
        <Route path="/" element={<Home isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/SignInPage" element={<SignInPage isDark={isDark} />} />
        <Route path="/SignUpPage" element={<SignUpPage isDark={isDark} />} />
        <Route path="/Dashboard" element={<DashBoard isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path='/accounts/:name' element={<AccountDetail isDark={isDark} />} />
        <Route path='/accounts/:name/AddTransaction' element={<AddTransactionPage isDark={isDark} />} />

        {/* Admin Routes - With Theme Support */}
        <Route path="/admin" element={<AdminLayout isDark={isDark} toggleTheme={toggleTheme} />}>
          <Route index element={<AdminDashboard isDark={isDark} />} />
          <Route path="users" element={<UserManagement isDark={isDark} />} />
          <Route path="financial" element={<FinancialDataManagement isDark={isDark} />} />
          <Route path="content" element={<ContentManagement isDark={isDark} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
