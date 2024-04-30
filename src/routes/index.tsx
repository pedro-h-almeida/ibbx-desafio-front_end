import { Route, Routes } from 'react-router-dom';
import NavBarComponent from '../components/NavBar';
import AtivosPage from '../pages/Ativos';
import HomePage from '../pages/HomePage';
import SensoresPage from '../pages/Sensores';
import "./style.css";
import LoadingOverlay from 'react-loading-overlay-ts';
import { useState } from 'react';

function RoutesComponent() {

  const [isLoading, setLoading] = useState(true)

  const handleIsLoadingChange = (state: boolean) => {
    setLoading(state);
  }

  return (
    <LoadingOverlay active={isLoading} spinner text='Carregando...'>
      <NavBarComponent />
      <div>
        <Routes>
          <Route path="/" element={<HomePage changeLoading={handleIsLoadingChange} />} />
          <Route path="/ativos" element={<AtivosPage changeLoading={handleIsLoadingChange} />} />
          <Route path="/sensores" element={<SensoresPage changeLoading={handleIsLoadingChange} />} />
        </Routes>
      </div>
    </LoadingOverlay>

  );
}

export default RoutesComponent;