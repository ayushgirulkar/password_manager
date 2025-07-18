import Navbar from './components/Navbar';
import Manage from './components/Manage';
import Footer from './components/Footer';
import './App.css'; // Make sure global styles are included

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Manage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
