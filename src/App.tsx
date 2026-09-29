import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import CoverPage from './components/CoverPage';
import NewTask from './components/NewTask';
import EditTask from './components/EditTask';
import MyTasksPage from './Pages/Task';

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#FAF9FB]">
        {/* Shared Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Pages */}
        <Routes>
          {/* Cover Page */}
          <Route
            path="/"
            element={<CoverPage />}
          />

          {/* New Task */}
          <Route
            path="/new-task"
            element={<NewTask />}
          />

          {/* Edit Task */}
          <Route
            path="/edit-task/:id"
            element={<EditTask />}
          />

          {/* My Tasks */}
          <Route
            path="/my-task"
            element={<MyTasksPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;