import IPaste from "../interfaces/IPaste";

interface DisplaySinglePasteProps {
  singlePaste: IPaste;
}

function DisplaySinglePaste({
  singlePaste,
}: DisplaySinglePasteProps): JSX.Element {
  const { title, paste } = singlePaste;
  return (
    <>
      <h1>{title ?? "empty"}</h1>
      <h3>{paste}</h3>
      <hr />
    </>
  );
}

export default DisplaySinglePaste;
