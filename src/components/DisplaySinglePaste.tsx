import IPaste from "../interfaces/IPaste";
import CommentsSection from "./CommentsSection";
import RevealPaste from "./RevealPaste";

interface DisplaySinglePasteProps {
  singlePaste: IPaste;
}

function DisplaySinglePaste({
  singlePaste,
}: DisplaySinglePasteProps): JSX.Element {
  const { title, paste } = singlePaste;
  console.log(paste);
  return (
    <>
      <h1>{title ?? "empty"}</h1>
      <RevealPaste paste={paste} />
      <CommentsSection pasteId={singlePaste.id} />
      <hr />
    </>
  );
}

export default DisplaySinglePaste;
