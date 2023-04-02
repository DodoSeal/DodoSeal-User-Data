import fetch from 'node-fetch';
import express from 'express';
const app = express();

app.get(`/*`, async (req, res) =>{
    const reqUrl = req.url;
    const fetchedData = await fetch(`https://poki.com` + reqUrl);
    const contentType = fetchedData.headers.get(`content-type`);
    const newBody = new Buffer.from(await fetchedData.arrayBuffer());
    res.set(`Content-Type`, contentType.split(`;`)[0]);
    res.status(fetchedData.status).write(newBody);
    res.end();
});

app.listen(80 || process.env.PORT);