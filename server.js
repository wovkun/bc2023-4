const http = require('http');
const fs = require('fs');
const xml = require('fast-xml-parser');

const server = http.createServer((req, res) => {
    fs.readFile('data.xml', 'utf-8', (err, data) => {
        const parser = new xml.XMLParser();
        const obj = parser.parse(data);
        
        const auctions = obj.auctions.auction;

        const output = {
            data: {
              auction: auctions.map((auction) => ({
                code: auction.StockCode,
                currency: auction.ValCode,
                attraction: auction.Attraction,
              })),
            },
          };

        const builder = new xml.XMLBuilder();
        const xmlStr = builder.build(output);
        
        res.writeHead(200, { "Content-Type": "text/xml"});
        res.end(xmlStr);
        })
    })

const host = 'localhost';
const port = 8000;
server.listen(port, () => { 
    console.log(`Server is running on port ${port}`); 
});
