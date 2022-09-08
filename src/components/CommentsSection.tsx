import axios from "axios";
import { useEffect, useState } from "react";
import IComment from "../interfaces/IComment";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";
import BACKEND_BASE_URL from "./constants/BACKEND_BASE_URL";

interface CommentsSectionProps {
  pasteId: number;
}

export default function CommentsSection({
  pasteId,
}: CommentsSectionProps): JSX.Element {
  const [show, setShow] = useState(false);
  const [listOfComments, setListOfComments] = useState<IComment[]>([]);
  const [refreshComments, setRefreshComments] = useState(false);

  const handleShowComments = () => {
    setShow(!show);
  };

  useEffect(() => {
    const getAllComments = async (pasteId: number) => {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/pastes/${pasteId}/comments`
      );
      const data: IComment[] = response.data;
      setListOfComments(data);
    };

    getAllComments(pasteId);
  }, [pasteId, refreshComments]);

  return (
    <>
      <h3
        className={`comment-toggle ${show ? "show" : ""}`}
        onClick={handleShowComments}
      >
        comments
      </h3>
      {show && (
        <>
          <AddComment
            pasteId={pasteId}
            setRefreshComments={setRefreshComments}
          />
          <CommentsList
            listOfComments={listOfComments}
            setRefreshComments={setRefreshComments}
          />
        </>
      )}
    </>
  );
}
