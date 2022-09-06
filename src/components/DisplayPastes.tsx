import { useEffect, useState } from "react";
import IPaste from "../interfaces/IPaste";
import axios from "axios";
import DisplaySinglePaste from "./DisplaySinglePaste";
import BASE_URL from "./constants/BASE_URL";

interface DisplayPastesProps {
  refreshPastes: boolean;
}

function DisplayPastes({ refreshPastes }: DisplayPastesProps): JSX.Element {
  const [pastes, setPastes] = useState<IPaste[]>([]);
  useEffect(() => {
    const getDbItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/pastes/latest/10`);
        const data: IPaste[] = response.data;
        setPastes([...data]);
      } catch (error) {
        console.error(error);
      }
    };
    getDbItems();
  }, [refreshPastes]);
  return (
    <>
      {pastes.map((paste) => (
        <DisplaySinglePaste singlePaste={paste} key={paste.id} />
      ))}
    </>
  );
}

export default DisplayPastes;
