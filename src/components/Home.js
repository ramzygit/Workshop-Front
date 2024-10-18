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
          <section className='main'>
              <img src='/logo.png' alt='logo'></img>
          
          <section className="actions">
            <button className="btn" onClick={handleConnexionClick}>Connexion</button>
            <button className="btn" onClick={handleInscriptionClick}>Inscription</button>
          </section>
          
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
