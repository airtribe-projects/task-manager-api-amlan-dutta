const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const taskRoutes = require("./taskRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    app.use("/tasks", taskRoutes);
    console.log(`Server is listening on ${port}`);
    //console.log(data);
});


module.exports = app;