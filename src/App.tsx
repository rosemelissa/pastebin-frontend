import { useState } from "react";
import DisplayPastes from "./components/DisplayPastes";
import PasteSubmit from "./components/PasteSubmit";
import RouteToPaste from "./components/RouteToPaste";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(): JSX.Element {
  const [refreshPastes, setRefreshPastes] = useState<boolean>(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              refreshPastes={refreshPastes}
              setRefreshPastes={setRefreshPastes}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <UniquePaste
              refreshPastes={refreshPastes}
              setRefreshPastes={setRefreshPastes}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

interface UniquePasteProps {
  refreshPastes: boolean;
  setRefreshPastes: React.Dispatch<React.SetStateAction<boolean>>;
}

function UniquePaste({
  refreshPastes,
  setRefreshPastes,
}: UniquePasteProps): JSX.Element {
  const pathname = window.location.pathname;
  const regex = /\/(\d+)/g;
  const regexMatches = Array.from(pathname.matchAll(regex))[0];
  const id = parseInt(regexMatches[1]);

  return (
    <>
      <RouteToPaste
        pasteId={id}
        refreshPastes={refreshPastes}
        setRefreshPastes={setRefreshPastes}
      />
    </>
  );
}

interface HomeProps {
  refreshPastes: boolean;
  setRefreshPastes: React.Dispatch<React.SetStateAction<boolean>>;
}

function Home({ refreshPastes, setRefreshPastes }: HomeProps): JSX.Element {
  return (
    <>
      <PasteSubmit setRefreshPastes={setRefreshPastes} />
      <DisplayPastes
        refreshPastes={refreshPastes}
        setRefreshPastes={setRefreshPastes}
      />
    </>
  );
}

export default App;
