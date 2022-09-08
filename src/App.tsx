import { useState } from "react";
import DisplayPastes from "./components/DisplayPastes";
import PasteSubmit from "./components/PasteSubmit";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<UniquePaste/>} />
      </Routes>
    </BrowserRouter>
  );
}

function UniquePaste(): JSX.Element {
  const pathname = window.location.pathname
  const regex = /\/(\d+)/g
  const regexMatches = Array.from(pathname.matchAll(regex))[0]
  const id = regexMatches[1]

  return (
    <>
        <p>You are seeing Paste with {id}</p>
    </>
  )
}
function Home(): JSX.Element {

  const [refreshPastes, setRefreshPastes] = useState<boolean>(true);

    return (
        <>
          <PasteSubmit setRefreshPastes={setRefreshPastes} />
          <DisplayPastes
            refreshPastes={refreshPastes}
            setRefreshPastes={setRefreshPastes}
          />
        </>
    )
}

export default App;
