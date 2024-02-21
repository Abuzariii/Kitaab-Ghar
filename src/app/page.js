import FetchBooks from "@/components/FetchBooks";
import Signup from "@/components/Signup";
import Login from "@/components/Login";

export default function Home() {
  return (
    <div>
      <h1>Book Store</h1>
      <FetchBooks />
      <Signup />
      <Login />
    </div>
  );
}
