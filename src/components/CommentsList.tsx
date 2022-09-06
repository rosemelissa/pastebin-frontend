import IComment from "../interfaces/IComment";
import SingleComment from "./SingleComment";

interface CommentsListProps {
  listOfComments: IComment[];
  setRefreshComments: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentsList({
  listOfComments,
  setRefreshComments,
}: CommentsListProps): JSX.Element {
  console.log(listOfComments);
  return (
    <>
      {listOfComments.map((comment) => {
        return (
          <SingleComment
            key={comment.id}
            comment={comment}
            setRefreshComments={setRefreshComments}
          />
        );
      })}
    </>
  );
}
