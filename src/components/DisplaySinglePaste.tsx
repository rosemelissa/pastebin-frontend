import axios from "axios";
import { useState } from "react";
import IPaste from "../interfaces/IPaste";
import CommentsSection from "./CommentsSection";
import BACKEND_BASE_URL from "./constants/BACKEND_BASE_URL";
import EditPaste from "./EditPaste";
import RevealPaste from "./RevealPaste";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

interface DisplaySinglePasteProps {
  singlePaste: IPaste;
  setRefreshPastes: React.Dispatch<React.SetStateAction<boolean>>;
}

function DisplaySinglePaste({
  singlePaste,
  setRefreshPastes,
}: DisplaySinglePasteProps): JSX.Element {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { title, paste, id, time } = singlePaste;

  const handleDeletePaste = () => {
    const deletePaste = async () => {
      try {
        await axios.delete(`${BACKEND_BASE_URL}/pastes/${id}`);
      } catch (error) {
        console.error(error);
      }
    };

    deletePaste().then(() =>
      setRefreshPastes((previousState) => !previousState)
    );
  };

  return (
    <div className="display-single-paste">
      <hr />
      {editMode ? (
        <EditPaste
          singlePaste={singlePaste}
          setRefreshPastes={setRefreshPastes}
          setEditMode={setEditMode}
        />
      ) : (
        <>
          <h1>
            <Link to={`/${singlePaste.id}`}>{title ?? "No title"}</Link>
          </h1>
          <p className="paste-date">{formatDate(time)}</p>
          <RevealPaste paste={paste} />
          <button
            onClick={() => {
              navigator.clipboard.writeText(paste);
            }}
          >
            Copy
          </button>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
      <CommentsSection pasteId={singlePaste.id} />
      <button className="delete" onClick={handleDeletePaste}>
        Delete Paste
      </button>
    </div>
  );
}

export default DisplaySinglePaste;
