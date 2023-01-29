import { useApolloClient } from '@apollo/client';

export default function LogoutButton() {
  const client = useApolloClient();
  console.log("local storage");


  const handleLogout = () => {
    localStorage.removeItem('token');
    client.resetStore();
  };

  return <button onClick={handleLogout}>Log out</button>;
}