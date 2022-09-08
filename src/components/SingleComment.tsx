import axios from "axios";
import IComment from "../interfaces/IComment";
import BACKEND_BASE_URL from "./constants/BACKEND_BASE_URL";

interface SingleCommentProps {
  comment: IComment;
  setRefreshComments: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SingleComment({
  comment,
  setRefreshComments,
}: SingleCommentProps): JSX.Element {
  const handleDeleteComment = () => {
    console.log(`deleting comment: ${comment.id}`);

    const deleteComment = async () => {
      try {
        await axios.delete(`${BACKEND_BASE_URL}/pastes/comments/${comment.id}`);
      } catch (error) {
        console.error(error);
      }
    };

    // refresh comment list
    deleteComment().then(() =>
      setRefreshComments((previousState) => !previousState)
    );
    console.log("refreshing commments after delete");
  };

  return (
    <>
      <p key={comment.id}>
        <button onClick={handleDeleteComment}>DELETE</button>
        {`${comment.time}: ${comment.message}`}
      </p>
    </>
  );
}
