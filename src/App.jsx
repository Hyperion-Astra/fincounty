import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";


// Public Pages
import Home from "./pages/Home";
import Personal from "./pages/Personal";
import Business from "./pages/Business";
import Mortgage from "./pages/Mortgage";
import Wealth from "./pages/Wealth";
import Foundation from "./pages/Foundation";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Transfer from "./dashboards/client/Transfer";
import Deposit from "./dashboards/client/Deposit";
import LoanApply from "./dashboards/client/LoanApply";


// Personal
import CheckingAccounts from "./pages/personal/CheckingAccounts";
import CompareCheckingAccounts from "./pages/personal/CompareCheckingAccounts";
import SwitchKit from "./pages/personal/SwitchKit";
import Savings from "./pages/personal/Savings";
import CDRates from "./pages/personal/CDRates";
import OnlineBanking from "./pages/personal/OnlineBanking";
import Loans from "./pages/personal/Loans";
import CreditCards from "./pages/personal/CreditCards";

// Business
import BusinessCashManagement from "./pages/business/BusinessCashManagement";
import BusinessCheckingAccounts from "./pages/business/BusinessCheckingAccounts";
import BusinessLoans from "./pages/business/BusinessLoans";
import BusinessSavings from "./pages/business/BusinessSavings";

// Mortgage
import MortgageGlossary from "./pages/mortgage/MortgageGlossary";
import MortgageOptions from "./pages/mortgage/MortgageOptions";
import MortgageProcess from "./pages/mortgage/MortgageProcess";
import MortgageRates from "./pages/mortgage/MortgageRates";
import HomebuyerResources from "./pages/mortgage/HomebuyerResources";
import MortgageCalculators from "./pages/mortgage/MortgageCalculators";

// Foundation
import GrantApplications from "./pages/foundation/GrantApplications";
import TaborAward from "./pages/foundation/TaborAward";
import GrantRecipients from "./pages/foundation/GrantRecipients";
import FoundationNews from "./pages/foundation/FoundationNews";

// Protected Routes
import ClientRoute from "./routes/ClientRoute";
import AdminRoute from "./routes/AdminRoute";

// Client Dashboard
import ClientLayout from "./dashboards/client/ClientLayout";
import ClientDashboard from "./dashboards/client/ClientDashboard";
import Profile from "./dashboards/client/Profile";
import ClientLoans from "./dashboards/client/ClientLoans";
import Withdraw from "./dashboards/client/Withdraw";
import WithdrawHistory from "./dashboards/client/WithdrawHistory";

// Admin Dashboard
import AdminLayout from "./dashboards/admin/AdminLayout";
import AdminHome from "./dashboards/admin/pages/AdminHome";
import Users from "./dashboards/admin/pages/Users";
import LoansAdmin from "./dashboards/admin/pages/LoansAdmin";
import WithdrawalsAdmin from "./dashboards/admin/pages/WithdrawalsAdmin";


// 🔥 Wrapper so we can use useLocation outside Router
function AppContent() {
  const location = useLocation();
  const hideLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Public Site */}
        <Route path="/" element={<Home />} />

        <Route path="/personal" element={<Personal />} />
        <Route path="/business" element={<Business />} />
        <Route path="/mortgage" element={<Mortgage />} />
        <Route path="/wealth" element={<Wealth />} />
        <Route path="/foundation" element={<Foundation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        {/* Personal */}
        <Route path="/personal/checking-accounts" element={<CheckingAccounts />} />
        <Route path="/personal/checking-accounts/compare" element={<CompareCheckingAccounts />} />
        <Route path="/personal/checking-accounts/switch-kit" element={<SwitchKit />} />
        <Route path="/personal/savings" element={<Savings />} />
        <Route path="/personal/cd-rates" element={<CDRates />} />
        <Route path="/personal/online-banking" element={<OnlineBanking />} />
        <Route path="/personal/loans" element={<Loans />} />
        <Route path="/personal/credit-cards" element={<CreditCards />} />

        {/* Business */}
        <Route path="/business/business-checking" element={<BusinessCheckingAccounts />} />
        <Route path="/business/savings" element={<BusinessSavings />} />
        <Route path="/business/business-lending" element={<BusinessLoans />} />
        <Route path="/business/cash-management" element={<BusinessCashManagement />} />

        {/* Mortgage */}
        <Route path="/mortgage/mortgage-process" element={<MortgageProcess />} />
        <Route path="/mortgage/mortgage-glossary" element={<MortgageGlossary />} />
        <Route path="/mortgage/homebuyer-resources" element={<HomebuyerResources />} />
        <Route path="/mortgage/mortgage-options" element={<MortgageOptions />} />
        <Route path="/mortgage/mortgage-rates" element={<MortgageRates />} />
        <Route path="/mortgage/calculators" element={<MortgageCalculators />} />

        {/* Foundation */}
        <Route path="/foundation/grant-applications" element={<GrantApplications />} />
        <Route path="/foundation/awards" element={<TaborAward />} />
        <Route path="/foundation/grant-recipients" element={<GrantRecipients />} />
        <Route path="/foundation/news" element={<FoundationNews />} />

        {/* Client Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ClientRoute>
              <ClientLayout />
            </ClientRoute>
          }
        >
          <Route index element={<ClientDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="loans" element={<ClientLoans />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="apply-loan" element={<LoanApply />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="withdraw-history" element={<WithdrawHistory />} />
        </Route>

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="users" element={<Users />} />
          <Route path="loans" element={<LoansAdmin />} />
          <Route path="withdrawals" element={<WithdrawalsAdmin />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

