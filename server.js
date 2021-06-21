
//              >>>   https://www.luiztools.com.br/post/como-publicar-aplicacao-reactjs-na-heroku/

const express = require('express');
const path = require('path');
require('dotenv/config');

const app = express();

app.use(express.static(path.join(__dirname, './build')));
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function(err) {
    console.log("server.js >>>")
    console.log('Caderneta da Criança listening on port ', server.address().port);
    console.log("Server on URL "+process.env.REACT_APP_API_URL)
    if (err) {
        console.log("err >>>")
        console.log(err)
    }
});


//              >>>   https://www.youtube.com/watch?v=S0_WcPP83z8

/* const express = require('express');
const { resolve } = require('path');

const app = express();

app.use('/',
        express.static( resolve(__dirname, './build') )
);

app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log("server.js > err >>>")
        console.log(err)
    }
  console.log('Aplicação iniciada');
}); */