import { useState } from "react";
import pasteFormatter from "../utils/pasteFormatter";

interface RevealPasteProps {
  paste: string;
}

function RevealPaste({ paste }: RevealPasteProps): JSX.Element {
  const [reveal, setReveal] = useState<boolean>(false);

  return (
    <p
      onClick={() => {
        setReveal(!reveal);
      }}
    >
      {pasteFormatter(paste, reveal).map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ))}
    </p>
  );
}

export default RevealPaste;
