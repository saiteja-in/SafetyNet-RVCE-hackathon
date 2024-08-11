
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store"; // Update with the correct path to your store
import Home from "./pages/Home";
import Header from "./components/Header";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Report from "./pages/Report";
import NearestSafeLocs from "./pages/NearestSafeLocs";
import Announcements from "./pages/Announcements";
import Emergency from "./pages/Emergency";

const App = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!currentUser) {
      return (
        <div className="text-center mt-20">
          <p className="text-lg">You need to sign in to access this content.</p>
          <a href="/sign-in" className="text-blue-500 underline">Go to Sign In</a>
        </div>
      );
    }
    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/report" element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          } />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/safe-loc" element={
            <ProtectedRoute>
              <NearestSafeLocs />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
