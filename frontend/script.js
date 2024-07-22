let commentsDiv = document.getElementById("comments");
let serverUrl = "http://localhost:3600";

const getComments = async () => {
    const res = await fetch(`${serverUrl}/get`, {
        method: "POST",
    });

    return res;
};

const putComments = async () => {
    try {
        const res = await getComments();
        const comments = await res.json();
        console.debug(comments);
        commentsDiv.append(comments);
    } catch (error) {
        console.error("404 youre a dumbass");
    }
};

putComments();

const postComment = async (comment) => {
    const res = await fetch(`${serverUrl}/post`, {
        method: "POST",
        body: JSON.stringify(comment),
    });

    return res;
};
