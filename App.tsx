
import React, { useState, useMemo, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import LiveTvPage from './pages/LiveTvPage';
import AdminLayout from './pages/Admin/AdminLayout';
import DashboardPage from './pages/Admin/DashboardPage';
import MediaManagementPage from './pages/Admin/MediaManagementPage';
import TaxonomyPage from './pages/Admin/TaxonomyPage';
import AppearancePage from './pages/Admin/AppearancePage';
import UsersPage from './pages/Admin/UsersPage';

export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
} | null>(null);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const authContextValue = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated]);
  
  const AdminRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const auth = useContext(AuthContext);
    return auth?.isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/media/:type/:id" element={<DetailPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/live-tv" element={<LiveTvPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="media" element={<MediaManagementPage />} />
            <Route path="taxonomy" element={<TaxonomyPage />} />
            <Route path="appearance" element={<AppearancePage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;