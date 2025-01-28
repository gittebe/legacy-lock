import "./DashboardWelcome.css";

export const DashboardWelcome = ({ username }) => {
  return (
    <div className="welcome-section">
      <h1>
        Welcome, <span className="username">{username}</span>
      </h1>
    </div>
  );
};