"use strict";
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const jokebookRoutes = require('./routes/jokebookRoutes');
app.use('/jokebook', jokebookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}!`));
