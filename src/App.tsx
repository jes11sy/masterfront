import { AppShell } from '@mantine/core';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Requests from './pages/Requests.tsx';
import Stats from './pages/Stats.tsx';
import Pay from './pages/Pay.tsx';
import Setting from './pages/Setting.tsx';
import Logout from './pages/Logout.tsx';
import Login from './pages/Login.tsx';
import NavbarMinimal from './components/NavbarMinimal';
import AppHeader from './components/AppHeader';

function App() {
  const location = useLocation();

  if (location.pathname === '/login') {
    return <Login />;
  }

  return (
    <AppShell
      padding={0}
      navbar={{ width: 80, breakpoint: 'sm' }}
      header={{ height: 60 }}
    >
      <AppShell.Header p={0}>
        <AppHeader />
      </AppShell.Header>

      <AppShell.Navbar p={0}>
        <NavbarMinimal />
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
