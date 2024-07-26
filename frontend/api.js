let serverUrl = "http://localhost:3001";

const handleRes = async (res) => {
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "not ok");
    }
    return await res.json();
};

export const getComments = async () => {
    const res = await fetch(`${serverUrl}/get`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return handleRes(res);
};

export const postComment = async (comment) => {
    await fetch(`${serverUrl}/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });
};
