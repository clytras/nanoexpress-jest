const app = require('./nano-server');

app.listen(3000, '0.0.0.0')
    .then(r => console.log("Server started"));
