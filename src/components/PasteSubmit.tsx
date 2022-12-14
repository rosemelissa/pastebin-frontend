import axios from "axios";
import { useState } from "react";
import IPasteSubmit from "../interfaces/IPasteSubmit";
import BACKEND_BASE_URL from "./constants/BACKEND_BASE_URL";

interface PasteSubmitProps {
  setRefreshPastes: React.Dispatch<React.SetStateAction<boolean>>;
}

function PasteSubmit({ setRefreshPastes }: PasteSubmitProps): JSX.Element {
  const [editablePaste, setEditablePaste] = useState<IPasteSubmit>({
    title: "",
    paste: "",
  });

  const handleSubmit = async () => {
    if (editablePaste.paste.length > 0) {
      try {
        if (editablePaste.title.length === 0) {
          const response = await axios.post(`${BACKEND_BASE_URL}/pastes/`, {
            title: null,
            paste: editablePaste.paste,
          });
          console.log(response);
        } else {
          const response = await axios.post(
            `${BACKEND_BASE_URL}/pastes/`,
            editablePaste
          );
          console.log(response);
        }
        setEditablePaste({ title: "", paste: "" });
        setRefreshPastes((previous) => !previous);
      } catch (error) {
        console.error(error);
      }
    } else {
      window.alert("Paste must have content");
    }
  };

  return (
    <div className="paste-submit">
      <input
        type="text"
        placeholder="Title"
        value={editablePaste.title}
        onChange={(e) =>
          setEditablePaste({ ...editablePaste, title: e.target.value })
        }
      />
      <textarea
        autoFocus
        name="Text1"
        cols={40}
        rows={5}
        placeholder="Paste"
        value={editablePaste.paste}
        onChange={(e) =>
          setEditablePaste({ ...editablePaste, paste: e.target.value })
        }
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default PasteSubmit;
