const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index');
const path = require('path')
const mongoose = require('mongoose');

const app = express();

// mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/athleteProfiles', { useNewUrlParser: true })
    .then(db => {
        console.log('mongoose connection successful');
    })
    .catch(err => {
        console.log(err);
    });


// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
  
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/api', routes);

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        error: {}
    });
});

const PORT = process.env.PORT || 3001;

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});

module.exports = app;