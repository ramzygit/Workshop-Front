import React from 'react';
import '../styles/Navbar.css';
import { useAuth } from '../contexts/AuthContext';
const Navbar = () => {
    const {isAuthenticated, logout} = useAuth();
  return (
    <nav className="navbar">
      <h1>Workshop</h1>
      <div className="links">
        {isAuthenticated ? (<>
            <a href="/">Accueil</a>
            <a href="/profile">Profil</a>
            <button onClick={logout}>Déconnexion</button>
        </>) : (
            <>
            <a href="/">Accueil</a>
            <a href="/connexion">Se connecter</a>
            <a href="/signup">S'inscrire</a>
            </>
            )}
        </div>
    </nav>
  );
}

export default Navbar;