export const putComments = async (comments) => {
    const commentsDiv = document.getElementById("comments");
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        if (comment.replyto) {
            break;
            //uhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh later.
        }
        const commentDiv = document.createElement("div");
        const commentContent = `<span class="commenterName">${comment.name}</span>
        <span class="commentText">${comment.comment}</span>`;
        commentDiv.innerHTML = commentContent;
        commentsDiv.append(commentDiv);
    }
};
