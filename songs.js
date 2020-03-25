var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('CC3_181122_Musik.db');

var suchwort = "Meat Loaf";
var laenge = 650;
var query = 'SELECT ID, artist, title, song_length FROM songs WHERE artist = ? AND song_length > ?';

// Beispiel einer sehr einfachen Abfrage mit eingesetzter Variable:
db.each(query, suchwort, laenge, function (err, row) { // <-- hier kommt der ERSTE Callback
  console.log('DATENBANK-ZEILE', row);
}, function (err, rowNumber) { // <--- DAS HIER IST DER ZWEITE CALLBACK!
  console.log('Alles fertig. Das waren jetzt ' + rowNumber + ' Zeilen.');
});

db.close();
