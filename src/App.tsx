import { useState } from "react";
import DisplayPastes from "./components/DisplayPastes";
import PasteSubmit from "./components/PasteSubmit";

function App(): JSX.Element {
  const [refreshPastes, setRefreshPastes] = useState<boolean>(true);
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
