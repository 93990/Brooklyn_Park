import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppTheme from './theme/AppTheme';
import HomeScreen from './pages/HomeScreen';
import OperatorInput from './pages/OperatorInput';
import OperatorInterface from './pages/OperatorInterfaceWorking';
import SupervisorLogin from './pages/SupervisorLogin';
import ConfigurationScreen from './pages/ConfigurationScreen';
import MachineInformation from './pages/MachineInformation';
import DowntimeList from './pages/DowntimeList';
import ShiftManagement from './pages/ShiftManagement';
import StandardCycleTime from './pages/StandardCycleTime';

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/operator-input" element={<OperatorInput />} />
          <Route path="/operator-interface" element={<OperatorInterface />} />
<Route path="/supervisor" element={<SupervisorLogin />} />
<Route path="/configuration" element={<ConfigurationScreen />} />
<Route path="/machine-info" element={<MachineInformation />} />
<Route path="/downtime-list" element={<DowntimeList />} />
<Route path="/shifts" element={<ShiftManagement />} />
          <Route path="/cycle-times" element={<StandardCycleTime />} />
          {/* Add error handling for invalid routes */}
          <Route path="*" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
