
var http = require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var url = require('url');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('CC3_181122_Musik.db');
var artists = ["Kayne West", "Phife Dawg", "Grandmaster Flash", "Afrika Bambaataa", "DJ Kool Herc"];

// Serve up public/ftp folder 
var serve = serveStatic('public', {'index': ['index.html', 'index.htm']});
const myURL = new URL('http://127.0.0.1:3000/artist?id =');
// Create server 
var server = http.createServer(function onRequest (req, res) {
var reqURL = url.parse(req.url, true);

  
res.end(artists[id]);

  if (reqURL.pathname === '/artist?id = 1') {
    res.statusCode = 200;
    console.log(reqURL.query.id);
    var id = reqURL.query.id;
    //d(db.exec('SELECT * FROM artists WHERE ID = ' + id));
    db.all('SELECT * FROM artists WHERE ID = ' + id, function (err, rows) {

        // dem Browser sagen, dass wir HTML senden
        res.setHeader('Content-Type', 'text/html; charset=utf-8');

        // artist in HTML einbinden
        res.write("<p>" + rows[0].artist + "</p>");
        

        // Antwort absenden
        res.end();

        for(var i=0; i<rows.length; i++){
          d(rows[0].artist);
        }
    });

  
  } else if (reqURL.pathname === '/artists') {
    

    res.statusCode = 200;

        
    var suchwort = "Meat Loaf";
    var laenge = 650;
    var query = 'SELECT ID, artist, title, song_length FROM songs WHERE artist = ? AND song_length > ?';

    // Beispiel einer sehr einfachen Abfrage mit eingesetzter Variable:
    db.each(query, suchwort, laenge, function (err, row) { // <-- hier kommt der ERSTE Callback
      console.log('DATENBANK-ZEILE', row);


    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // artist in HTML einbinden
    res.write("<p>" + 'hallo' + "</p>");

    }, function (err, rowNumber) { // <--- DAS HIER IST DER ZWEITE CALLBACK!
      console.log('Alles fertig. Das waren jetzt ' + rowNumber + ' Zeilen.');
      res.end();
      d('hallo');
    });
  
  
  }

   

    
  	else {
    serve(req, res, finalhandler(req, res)); // <---- unveränderter Aufruf von vorher

    
  }

  db.close();
  
  
  
});
 



// Listen starts the actual server on the specified port
server.listen(3000);



function d(str){
  console.log(str);
}