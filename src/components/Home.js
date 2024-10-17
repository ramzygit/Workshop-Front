import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleConnexionClick = () => {
      navigate('/connexion');
    };

    const handleInscriptionClick = () => {
      navigate('/signup');
    }

    const handleProfilClick = () => {
      navigate('/profile');
    }

    const handleVerifyClick = () => {
      navigate('/verify');
    }

    const homePageNoConnexion =  (
      <div className="Home">
        <header>
          <h1>Identité numérique</h1>
        </header>
        
        <main>
          <section className="workshop-info">
            <p>Workshop</p>
            <img src="https://media.giphy.com/media/3o7TKz9bX9v9KzCnXK/giphy.gif" alt="Gif de chat" />
          </section>
          
          <section className="actions">
            <button className="btn" onClick={handleConnexionClick}>Connexion</button>
            <button className="btn" onClick={handleInscriptionClick}>Inscription</button>
          </section>
        </main>

        <footer>
          <p>© 2024 - Identité numérique</p>
        </footer>
      </div>
    )

    const homePageConnexion = (
      <div className="Home">
        <header>
          <h1>Identité numérique</h1>
        </header>
        
        <main>
          <section className="actions">
            <button className="btn" onClick={handleProfilClick}>Profil</button>
            <button className="btn" onClick={handleVerifyClick}>Verifier mon Identité</button>
            <button className="btn" onClick={logout}>Déconnexion</button>
          </section>
        </main>

        <footer>
          <p>© 2024 - Identité numérique</p>
        </footer>
      </div>
    )

    return (
      <>
        {isAuthenticated && homePageConnexion}
        {!isAuthenticated && homePageNoConnexion}
      </>
    );
  
}

export default Home;
