let express = require('express');
let app = express();


app.use('/api/files', require('./controllers/files'));

app.listen(process.env.PORT)