import React from 'react';

const store = [
  'Steckdosenbefruchter',
  'Sohn einer blutpissenden Hafenhure',
  'Monsterbacke',
  'Spermarutsche',
  'Evolutionsbremse',
  'Gabbafotze',
  'Homo-Fürst der Finsternis',
  'Fickfehler',
  'Karussellbremser',
  'Teflongesicht',
  'Arschgeficktes Eichhörnchen',
  'Puffgezeugte Arschgeburt',
  'Fettgondel',
  'Hodenkobolt',
  'Eunuch im Neoprenanzug',
  'Bei-Teletubies-Orgasmus-krieger',
  'Schleim-scheissende-Bambus-Kröte',
  'Perückenschaf',
  'Hurensohn',
  'Bumsklumpen',
  'Bitch',
  'Arschnase mit Analantrieb',
  'Rechtschreibüberprüfungsprogrammbenutzer',
  'Kotnascher',
  'Laternenschlampe',
  'Pimmelflöte',
  'Schamhaarschädel',
  'Fotzenkäse',
  'Kackfass',
  'Fotze',
  'Pimmelbär',
  'Dönergesicht',
  'Arschwabe',
  'Aushilfsamöbe',
  'Arschloch',
  'Hackfresse',
  'Analfrosch',
  'Fickschlitz',
  'Bückstück',
  'schwuler Messdiener',
  'Abspritzer',
  'Arschgeburt',
  'Am-Sperma-Riecher',
  'Afterlecker',
  'Gesichtsfotze',
  'Vagina',
  'Hühnerficker',
  'A-Klasse-nicht-zum-Kippen-Bringer',
  'Schlampen-mehrmal-Ficker',
  'Pimperperle'
];

const RandomSwearWord = props => {
  const randomId = Math.floor(Math.random() * store.length);
  return <span>{store[randomId]}</span>;
};

export default RandomSwearWord;
