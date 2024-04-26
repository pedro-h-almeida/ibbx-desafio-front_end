import { Route, Routes } from 'react-router-dom';
import NavBarComponent from '../components/NavBar';
import AtivosPage from '../pages/Ativos';
import HomePage from '../pages/HomePage';
import SensoresPage from '../pages/Sensores';
import "./style.css";

function RoutesComponent() {
  return (
    <>
      <NavBarComponent />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ativos" element={<AtivosPage />} />
          <Route path="/sensores" element={<SensoresPage />} />
        </Routes>
      </div>
    </>

  );
}

export default RoutesComponent;