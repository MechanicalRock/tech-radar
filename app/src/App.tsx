import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Modal from './components/modal';
import Radar from './components/Radar';
import RadarMenu from './components/radarMenu';
import './styles/App.scss';
import store from './utils/store';

function App(): JSX.Element {
  const unresolvedWasm = import('./wasm/react_rust_wasm');
  // let wasm: { big_computation(): void };

  const handleLogoClick = () => {
    console.log("waiting for magic to happen"); // tslint:disable-line
  };

  useEffect(() => {
    unresolvedWasm.then(result => {
      console.log(result.big_computation()); // tslint:disable-line
    });
    // handleLogoClick = wasm.big_computation;
  });

  return (
    <Provider store={store}>
      <header>
        <img
          className="company-logo"
          src="/img/mech-rock-logo.png"
          alt="Mechanical Rock logo"
          onClick={handleLogoClick}
        />
        <img
          className="app-logo"
          src="/img/radar-icon.png"
          alt="Tech Radar logo"
        />
        <h1 className="title">Tech Radar</h1>
      </header>
      <main>
        <RadarMenu />
        <Radar />
      </main>
      <Modal />
    </Provider>
  );
}

export default App;
