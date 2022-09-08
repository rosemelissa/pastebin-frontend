import axios from "axios";
import { useState } from "react";
import BACKEND_BASE_URL from "./constants/BACKEND_BASE_URL";

interface AddCommentProps {
  pasteId: number;
  setRefreshComments: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddComment({
  pasteId,
  setRefreshComments,
}: AddCommentProps): JSX.Element {
  const [commentMessage, setCommentMessage] = useState("");

  const handleAddComment = () => {
    console.log(`Adding Comment: ${commentMessage}`);
    const AddCommentToPaste = async (pasteId: number) => {
      try {
        if (commentMessage.length > 0) {
          await axios.post(`${BACKEND_BASE_URL}/pastes/${pasteId}/comments`, {
            message: commentMessage,
          });
        } else {
          console.log("Empty comment made");
        }
      } catch (error) {
        console.error(error);
      }
    };

    AddCommentToPaste(pasteId).then(() =>
      setRefreshComments((previousState) => !previousState)
    );
    setCommentMessage("");
  };

  return (
    <p className="add-comment">
      <input
        onChange={(e) => setCommentMessage(e.target.value)}
        value={commentMessage}
        placeholder="add your thoughts!"
      />
      <button onClick={handleAddComment}>Add comment</button>
    </p>
  );
}
