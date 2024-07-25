import { getComments, handlePostComment } from "./api";
import { Comment } from "shared";
import { useEffect, useState } from "react";

const App = () => {
    const [comments, setComments] = useState([]);
    const [currentComment, setCurrentComment] = useState(new Comment());

    useEffect(() => {
        (async () => setComments(await getComments()))();
        const id = setInterval(() => {
            (async () => setComments(await getComments()))();
        }, 1000);
        return () => clearInterval(id);
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCurrentComment((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        handlePostComment(currentComment);
        (async () => setComments(await getComments()))();

        document.getElementById("comment-input").value = "";
        setCurrentComment({ ...currentComment, comment: "" });
    };

    return (
        <div>
            <h1>Comment Section</h1>
            <div></div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        name="name"
                        onChange={handleChange}
                        placeholder="name"
                    />
                </label>
                <br />
                <label>
                    <input
                        id="comment-input"
                        name="comment"
                        onChange={handleChange}
                        placeholder="comment"
                    />
                </label>
                <br />
                <input type="submit" />
            </form>
            ---
            <div>
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className={
                            currentComment.replyto === comment.id
                                ? "selected-comment comment"
                                : "comment"
                        }
                    >
                        {comment.name}: {comment.comment}{" "}
                        <button
                            className="reply-button"
                            onClick={() =>
                                setCurrentComment({
                                    ...currentComment,
                                    replyto: comment.id,
                                })
                            }
                        >
                            (reply)
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
