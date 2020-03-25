var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('CC3_181122_Musik.db');

var suchwort = "Wir sind Helden";

// Beispiel einer sehr einfachen Abfrage mit eingesetzter Variable:
db.all('SELECT * FROM artists WHERE artist = ?', suchwort, function (err, rows) {
  if (!err) {
    console.log('Die Abfrage ergab ' + rows.length + ' Zeilen');
    console.log('Hier ist eine der Zeilen:', rows[0]);
  } else {
    console.error('Etwas ist schief gegangen', err);
  }
});

// dem Browser sagen, dass wir HTML senden
res.setHeader('Content-Type', 'text/html; charset=utf-8');

// artist in HTML einbinden
res.write("<p>" + rows[0].artist + "</p>");

// Antwort absenden
res.end();

db.close();
