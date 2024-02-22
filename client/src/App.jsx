import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Admin.css";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Search from "./pages/Search";
import UserLayout from "./pages/UserLayout";
import { useEffect, useState } from "react";
import CreateProduct from "./admin/Admin_CreateProduct";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/reducer/userData";
import Logout from "./auth/Logout";
import Dashboard from "./admin/Dashboard";
import Admin_Sidebar from "./admin/comp/Admin_Sidebar";
import Admin_Item from "./admin/Admin_Item";
import Admin_Navbar from "./admin/comp/Admin_Navbar";
import Song from "./pages/Song";
import Item_Manage from "./admin/Item_Update";
import Explore from "./pages/Explore";
import ExploreSong from "./pages/ExploreSong";
import { axiosInstance } from "./utils/axois";
// import Loading from "./components/Loading";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState({});
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get("/api/user/");
        if (res) {
          setLoading(false);
          setAuth(true);
          setData(res.data);
          dispatch(setUserData(res.data));
        }
      } catch (err) {
        setLoading(false);
        setAuth(false);
        // console.log(err);
      }
    };
    getData();
  }, [loggedIn]);

  if (loading) {
    // return <Loading />;
  } else {
    if (auth) {
      if (data.role === "user") {
        return (
          <>
            <Routes>
              <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/songs/:id" element={<Song />} />
                <Route path="/library" element={<Library />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/explore/:id" element={<ExploreSong />} />
              </Route>
              <Route path="logout" element={<Logout />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </>
        );
      } else if (data.role === "artist") {
        return (
          <>
            <Admin_Sidebar />
            <Admin_Navbar />
            <section id="main_section">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/songs" element={<Admin_Item />} />
                <Route path="/songs/create" element={<CreateProduct />} />
                <Route path="/songs/update/:id" element={<Item_Manage />} />
                <Route path="logout" element={<Logout />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            </section>
          </>
        );
      } else {
        return <>UnAuthrorized User</>;
      }
    } else {
      return (
        <>
          <Routes>
            <Route
              path="/login"
              element={<Login setloggedIn={setloggedIn} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </>
      );
    }
  }
};

export default App;
