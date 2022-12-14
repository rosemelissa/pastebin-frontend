import { useEffect, useState } from "react";
import IPaste from "../interfaces/IPaste";
import axios from "axios";
import DisplaySinglePaste from "./DisplaySinglePaste";
import BACKEND_BASE_URL from "./constants/BACKEND_BASE_URL";
import { Link } from "react-router-dom";

interface RouteToPasteProps {
  refreshPastes: boolean;
  setRefreshPastes: React.Dispatch<React.SetStateAction<boolean>>;
  pasteId: number;
}

function RouteToPaste({
  refreshPastes,
  setRefreshPastes,
  pasteId,
}: RouteToPasteProps): JSX.Element {
  const [paste, setPaste] = useState<IPaste | null>(null);
  useEffect(() => {
    const getDbItems = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_BASE_URL}/pastes/${pasteId}`
        );
        const data: IPaste = response.data;
        setPaste(data);
      } catch (error) {
        console.error(error);
      }
    };
    getDbItems();
  }, [pasteId, refreshPastes]);
  return (
    <>
      <Link to="/">back</Link>
      {paste && (
        <DisplaySinglePaste
          singlePaste={paste}
          key={paste.id}
          setRefreshPastes={setRefreshPastes}
        />
      )}
    </>
  );
}

export default RouteToPaste;
