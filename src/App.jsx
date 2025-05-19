import { useState } from 'react';
import AmericasNav from './components/AmericasNav';
import RandomImageRotator from './components/RandomImageRotator';
import './App.css';
import AmericasCountryList from './components/AmericasCountryList';


function App() {
  const [selectedRegion, setSelectedRegion] = useState("South America");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleHomeClick = () => {
    setSelectedCountry(null);
  };

  return (
    <>
      <>
        <AmericasNav
          onRegionChange={setSelectedRegion}
          onHomeClick={handleHomeClick}
          isCountrySelected={!!selectedCountry}
        />
        {!selectedCountry && <RandomImageRotator />}
        <AmericasCountryList
          region={selectedRegion}
          onCountrySelect={handleCountrySelect}
          selectedCountry={selectedCountry}
        />
      </>

    </>
  );
}

export default App;
