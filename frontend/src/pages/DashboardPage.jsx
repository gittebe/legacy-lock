import useStore from "../store/store";

const DashboardPage = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You need to be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <p>This is your dashboard!</p>
    </div>
  );
};

export default DashboardPage;
