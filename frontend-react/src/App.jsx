import { getComments, handlePostComment } from "./api";
import { Comment } from "shared";
import { useEffect, useState } from "react";
import CommentComponent from "./Comment";

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

    const handleReplySelect = (id) => {
        if (currentComment.replyto === id) {
            setCurrentComment({
                ...currentComment,
                replyto: null,
            });
        } else {
            setCurrentComment({
                ...currentComment,
                replyto: id,
            });
        }
    };

    const renderComments = () => {
        let prevCommentIDs = new Map();
        let aaa = [];

        const ahksdfasf = new Map();
        comments.map((c) => {
            ahksdfasf.set(c.id, c);
        });

        // [{root: 12, replies: [{...}, {...}]}, {...}]
        for (let i = 0; i < comments.length; i++) {
            let thing = {
                root: comments[i].id,
                replies: [],
            };
            prevCommentIDs.set(comments[i].id, thing);
            if (prevCommentIDs.has(comments[i].replyto)) {
                prevCommentIDs.get(comments[i].replyto).replies.push(thing);
            } else {
                aaa.push(thing);
            }
        }

        const renderAaaa = (thing) => {
            return (
                <div key={thing.root}>
                    <CommentComponent
                        comment={ahksdfasf.get(thing.root)}
                        className={
                            currentComment.replyto === thing.root
                                ? "selected-comment comment"
                                : "comment"
                        }
                        onReplySelect={() => handleReplySelect(thing.root)}
                    />
                    {thing.replies.length !== 0 && (
                        <div className="reply-section">
                            {thing.replies.map((thing2) => renderAaaa(thing2))}
                        </div>
                    )}
                </div>
            );
        };

        return <div>{aaa.map((thing) => renderAaaa(thing))}</div>;
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
            {renderComments()}
            {/* <div>
                {comments.map((comment) => (
                    <CommentComponent
                        comment={comment}
                        className={
                            currentComment.replyto === comment.id
                                ? "selected-comment comment"
                                : "comment"
                        }
                        onReplySelect={() => handleReplySelect(comment.id)}
                    />
                ))}
            </div> */}
        </div>
    );
};

export default App;
