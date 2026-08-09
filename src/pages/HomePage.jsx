import MapView from "../components/MapView";
import "./HomePage.css";
function HomePage({ userId, onLogout }) {
  return (
    <div className="home-page">
      <div className="home-header">
        <button
          className="logout-button"
          onClick={onLogout}
        >
          Çıkış Yap
        </button>
      </div>

      <MapView userId={userId} />
    </div>
  );
}
export default HomePage;