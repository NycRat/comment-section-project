const CommentComponent = ({ comment, className, onReplySelect }) => {
    return (
        <div key={comment.id} className={className}>
            <i>{comment.name}</i>: {comment.comment}{" "}
            <button className="reply-button" onClick={onReplySelect}>
                (reply)
            </button>
        </div>
    );
};

export default CommentComponent;
