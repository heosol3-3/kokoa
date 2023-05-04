import { useEffect, useState } from "react";
import { authService } from "./fbase";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Chatting from "./components/Chatting";
import Find from "./routes/Find";
import More from "./routes/More";
import Profile from "./routes/Profile";
import Chats from "./routes/Chats";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [user, setUser] = useState(authService.currentUser);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if(user) {
        setIsLoggedIn(user);
        setUser(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  },[user])
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggedIn ? (
          <>
          <Route index element={<Home user={user} />} />
          <Route path="/Chats" element={<Chats />} />
          <Route path="/Chatting" element={<Chatting />} />
          <Route path="/Find" element={<Find />} />
          <Route path="/More" element={<More />} />
          <Route path="/Profile" element={<Profile />} />
          </>
        ) : (
          <Route index element={<Login></Login>} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
