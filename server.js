
//              >>>   https://www.luiztools.com.br/post/como-publicar-aplicacao-reactjs-na-heroku/

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, './build')));
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
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