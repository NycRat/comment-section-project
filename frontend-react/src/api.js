const serverURL = "http://localhost:3001";

export const handlePostComment = async (comment) => {
    const res = await fetch(`${serverURL}/post`, {
        method: "POST",
        body: JSON.stringify(comment),
    });
    if (!res.ok) {
        console.error(res.statusText);
    } else {
        console.log(res.statusText);
    }
};

export const getComments = async () => {
    const res = await fetch(`${serverURL}/get`, {
        method: "POST",
    });
    if (!res.ok) {
        console.error(res.statusText);
        return [];
    } else {
        console.log(res.statusText);
        return await res.json();
    }
};
