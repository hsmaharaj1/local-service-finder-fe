import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import AuthForms from './pages/AuthForms';
import ServiceCard from './components/ServiceCard';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<AuthForms />} />
        <Route exact path="/service" element={<ServiceCard />} />
      </Routes>
    </>
  )
}

export default App
