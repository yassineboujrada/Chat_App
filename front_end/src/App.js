import {BrowserRouter , Routes , Route } from "react-router-dom"
import Register from './page_of_auth/Register';
import Chat from './page_of_auth/Chat';
import Login from './page_of_auth/Login';
import SetAvatar from "./page_of_auth/SetAvatar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
