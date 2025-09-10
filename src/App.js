import React from 'react';
import MobilePatientUI from './components/MobileUI';
import WebPatientUI from './components/WebUI';

function App() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="App">
      {isMobile ? <MobilePatientUI /> : <WebPatientUI />}
    </div>
  );
}

export default App;