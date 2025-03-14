import {AuthProvider} from "./context/AuthContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navbar} from "./components/Navbar.jsx";
import "./App.css";

const App = () => {
  return 
  <AuthProvider>
    <BrowserRouter>
      <Navbar>

      </Navbar>
    </BrowserRouter>
  </AuthProvider>
};

export default App;
