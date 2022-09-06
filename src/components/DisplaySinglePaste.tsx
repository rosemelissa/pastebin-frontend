import axios from "axios";
import IPaste from "../interfaces/IPaste";
import CommentsSection from "./CommentsSection";
import BASE_URL from "./constants/BASE_URL";
import RevealPaste from "./RevealPaste";

interface DisplaySinglePasteProps {
  singlePaste: IPaste;
  setRefreshPastes: React.Dispatch<React.SetStateAction<boolean>>
}

function DisplaySinglePaste({
  singlePaste,
  setRefreshPastes
}: DisplaySinglePasteProps): JSX.Element {
  const { title, paste, id } = singlePaste;
  console.log(paste);
  
  const handleDeletePaste = () => {

    const deletePaste = async () => {
      try {
        await axios.delete(`${BASE_URL}/pastes/${id}`);
      } catch (error) {
        console.error(error);
      }
    };
    
    deletePaste().then(() => setRefreshPastes((previousState) => !previousState))
  }

  return (
    <>
      <h1>{title ?? "empty"}</h1>
      <RevealPaste paste={paste} />
      <CommentsSection pasteId={singlePaste.id} />
      <button onClick={handleDeletePaste}>Delete Paste</button>
      <hr />
    </>
  );
}

export default DisplaySinglePaste;
