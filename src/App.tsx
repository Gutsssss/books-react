import { Outlet } from 'react-router-dom';
import { Navbar } from './widgets/navbar';
function App() {
  return (
    <div className="app">
      <Navbar/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;