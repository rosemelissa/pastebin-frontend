import { useEffect, useState } from "react";
import IPaste from "../interfaces/IPaste";
import axios from "axios";
import DisplaySinglePaste from "./DisplaySinglePaste";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bhawick-melissa-pastebin.onrender.com"
    : "http://localhost:4000";

function DisplayPastes(): JSX.Element {
  const [pastes, setPastes] = useState<IPaste[]>([]);
  useEffect(() => {
    const getDbItems = async () => {
      try {
        const response = await axios.get(`${baseUrl}/latest/10`);
        const data: IPaste[] = response.data;
        setPastes([...data]);
      } catch (error) {
        console.error(error);
      }
    };
    getDbItems();
  }, []);
  return (
    <>
      {pastes.map((paste) => (
        <DisplaySinglePaste singlePaste={paste} key={paste.id} />
      ))}
    </>
  );
}

export default DisplayPastes;
