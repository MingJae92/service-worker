import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Recipedetails from './components/Recipedetails/Recipedetails';

function App() {
  return (
    <>
      {/* Header is placed here if it's common for all routes */}
      <Header />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/recipe/:id" element={<Recipedetails />} />
      </Routes>
    </>
  );
}

export default App;
