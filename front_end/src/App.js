import {BrowserRouter , Routes , Route } from "react-router-dom"
import Register from './page_of_auth/Register';
import Chat from './page_of_auth/Chat';
import Login from './page_of_auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
