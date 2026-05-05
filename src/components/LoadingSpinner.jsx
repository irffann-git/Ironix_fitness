import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
        <div className="logo-container">
          <img src="/ironix.png" alt="Ironix" />
        </div>
      </div>
      <p className="loading-message">Forging your experience...</p>
    </div>
  );
}

export default LoadingSpinner;