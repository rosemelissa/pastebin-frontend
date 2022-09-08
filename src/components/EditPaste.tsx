import axios from "axios";
import { useState } from "react";
import IPaste from "../interfaces/IPaste";
import IPasteSubmit from "../interfaces/IPasteSubmit";
import BACKEND_BASE_URL from "./constants/BACKEND_BASE_URL";

interface EditPasteProps {
  singlePaste: IPaste;
  setRefreshPastes: React.Dispatch<React.SetStateAction<boolean>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditPaste({
  singlePaste,
  setRefreshPastes,
  setEditMode,
}: EditPasteProps): JSX.Element {
  const pasteTitle = singlePaste.title ?? "";
  const [editablePaste, setEditablePaste] = useState<IPasteSubmit>({
    title: pasteTitle,
    paste: singlePaste.paste,
  });

  const handleSubmitEdit = async () => {
    if (editablePaste.paste !== "") {
      try {
        if (editablePaste.title !== "") {
          await axios.put(`${BACKEND_BASE_URL}/pastes/${singlePaste.id}`, {
            title: editablePaste.title,
            paste: editablePaste.paste,
          });
        } else {
          await axios.put(`${BACKEND_BASE_URL}/pastes/${singlePaste.id}`, {
            title: null,
            paste: editablePaste.paste,
          });
        }
        setRefreshPastes((previousState) => !previousState);
        setEditMode(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      window.alert("Paste must have content");
    }
  };

  return (
    <>
      <div className="edit-paste">
        <input
          type="text"
          placeholder="Title"
          value={editablePaste.title}
          onChange={(e) =>
            setEditablePaste({ ...editablePaste, title: e.target.value })
          }
        />
        <textarea
          name="Text1"
          cols={40}
          rows={5}
          placeholder="Paste"
          value={editablePaste.paste}
          onChange={(e) =>
            setEditablePaste({ ...editablePaste, paste: e.target.value })
          }
        ></textarea>
      </div>
      <button onClick={handleSubmitEdit}>Finish editing</button>
      <button onClick={() => setEditMode(false)}>Cancel</button>
    </>
  );
}

export default EditPaste;
