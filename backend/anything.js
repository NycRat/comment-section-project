import express, { text } from "express"; //!
import { Comment } from "shared";

import cors from "cors";
const app = express();
const port = 3600;

app.use(cors());
app.use(text());

let commentSection = [];

app.get("/", (request, response) => {
    response.send("Hello World!");
});

app.post("/post", (request, response) => {
    let comment = new Comment();
    comment.id = commentSection.length;
    comment.name = "Abraham";
    comment.comment = JSON.stringify(request.body);

    commentSection.push(comment);

    // console.log(toString(commentSection));
    console.log(commentSection);
    response.sendStatus(201);
});

// should be a get instead of post but whateverrrrrrr
app.post("/get", (request, response) => {
    response.send(JSON.stringify(commentSection));
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
