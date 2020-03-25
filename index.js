var http = require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var url = require('url');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('CC3_181122_Musik.db');

//var artists = ["Kayne West", "Phife Dawg", "Grandmaster Flash", "Afrika Bambaataa", "DJ Kool Herc"];


// Serve up public/ftp folder 
var serve = serveStatic('public', {'index': ['index.html', 'index.htm']});
//const myURL = new URL('http://127.0.0.1:3000/artist?id=1');
// Create server 
var server = http.createServer(function onRequest (req, res) {
var reqURL = url.parse(req.url, true);
d(reqURL);

res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  
  if (reqURL.pathname === '/artist/') {
      res.statusCode = 200;
      console.log(reqURL.query.id);
      var id = reqURL.query.id;





      //d(db.exec('SELECT * FROM artists WHERE ID = ' + id));
      db.all('SELECT songs.artist, songs.title FROM artists, songs WHERE artists.artist = songs.artist AND artists.ID = ' + id, function (err, rows) {
          d('hallo');
          // dem Browser sagen, dass wir HTML senden

          // artist in HTML einbinden
          res.write("<p>" + rows[0].artist + "</p>");
          res.write("<p>" + rows[0].title + "</p>");


          // von Aufgabe --> wurde für die folgenden Aufgaben auskommentiert
          //res.write(artists[id]);

          

          // Antwort absenden
          //res.end();
            for(var i=0; i<rows.length; i++){
              d(rows[0].artist);
            }
      });
    


  
  
  } 
  
  else if (reqURL.pathname === '/artists') {
    

            res.statusCode = 200;
            //res.write("<meta charset=\"utf-8\">");
            var suchwort = "10 CC";
           
            var query = 'SELECT * FROM artists';
            //var id = reqURL.query.id;
            // Beispiel einer sehr einfachen Abfrage mit eingesetzter Variable:
            db.all('SELECT * FROM artists',  function (err, rows) { 
              for(var i = 0; i<rows.length; i++){
                var ui = '/artist?id=' + rows[i].ID;
                res.write("<li><a href="+ui+">" + rows[i].artist + "</a></li>"); 
              }
             res.end(); 
            });
  }

  else if (reqURL.pathname === '/artist?id=1855') {
    

    res.statusCode = 200;
     
        //ja mit HTML Verbindung 
        d('Walhalla');
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('Get', 'file:///C:/Users/su-cl/Documents/IMD/P3/CC3/CC3_181206_Rundumschlag_Gesamtkunstwerk_Coenen/public/index.html');
        ourRequest.onload = function(){
          var ourData = JSON.parse(ourRequest.responseText);
          renderHTML(ourData);
          res 
        
        };
  
         ourRequest.send();

    

}

    
  	else {
    serve(req, res, finalhandler(req, res)); // <---- unveränderter Aufruf von vorher

    
  }

  //db.close();
  
  
  
});
 



// Listen starts the actual server on the specified port
server.listen(3000);



function d(str){
  console.log(str);
}