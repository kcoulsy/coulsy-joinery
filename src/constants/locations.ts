export const LOCATIONS = [
  "doncaster",
  "durham",
  "lincoln",
  "manchester",
  "salford",
  "sheffield",
  "huddersfield",

  "wakefield",
  "castleford",
  "pontefract",

  "garforth",
  "rothwell",

  "yorkshire",
  "lancashire",

  "leeds",
    "bradford",
    "harrogate",
    "horsforth",
    "bingley",
    "shipley",
    "ilkley",
    "otley",
    "skipton",
    "knaresborough",


  "york",
    "selby",
    "malton",
    "tadcaster",
    "pocklington",
    "elvington",
    "welburn",
    "stamford-Bridge",
    "towton",
    "wetherby",

  "ripon",
    "thirsk",
    "masham",
    "boroughbridge",


        "harrogate",
        "knaresborough",
        "spofforth",
        "pannal",
        "ripley",
        "follifoot",




];

export const NEARBY_LOCATIONS: Record<string, string[]> = {
  default: [
    "leeds",
    "manchester",
    "york",
    "sheffield",
    "bradford",
    "huddersfield",
    "yorkshire",
    "lancashire",
  ],
  leeds: [
    "york",
    "bradford",
    "harrogate",
    "knaresborough",
    "garforth",
    "rothwell",
    "horsforth",
    "bingley",
    "ilkley",
    "otley",
    "skipton",
    "wetherby",
  ],
  bradford: [
    "leeds",
    "harrogate",
    "horsforth",
    "bingley",
    "shipley",
    "ilkley",
    "otley",
    "skipton",
    "wetherby",
  ],
  york: [
      "selby",
      "malton",
      "tadcaster",
      "pocklington",
      "elvington",
      "welburn",
      "stamford-Bridge",
      "towton",
      "wetherby",
      "leeds",
    ],

    ripon: [
      "thirsk",
      "masham",
      "boroughbridge",
      "leeds",
      "york",
      ],
      harrogate: [
        "knaresborough",
        "spofforth",
        "pannal",
        "ripley",
        "follifoot",
        ],
  


};
