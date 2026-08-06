import MapView from "../components/MapView";
function HomePage({ userId, onLogout }) {
    return (
        
    <div>
      <button onClick={onLogout}>
        Çıkış Yap
      </button>

      <MapView userId={userId} />
    </div>
  );
}
export default HomePage;