const express = require('express');
const app = express();

app.get('/discord/:id', (req, res) => {
    var userId = req.params.id;
    if (!userId) {res.status(403)};
    
    fetch(`https://discord.com/api/v10/users/${userId}`, {
    headers: {
        Authorization: process.env.BOT_AUTH
    }
    }).then(data => data.json().then(response =>{
        var avatar = response.avatar;
        if (avatar) {
            if (avatar.includes(`a_`)) {
                res.json({ url: "https://cdn.discordapp.com/avatars/${userId}/${response.avatar}.gif" });
            } else {
                res.json({ url: "https://cdn.discordapp.com/avatars/${userId}/${response.avatar}" });
            };
        };
    }));
});

app.get('/roblox/:username', (req, res) => {
    var username = req.params.username;
    if (!username) {res.status(403)};
    
    fetch(`https://api.roblox.com/users/get-by-username?username=${username}`).then(data => data.json().then(response =>{
        res.json(response);
    }));
});

app.listen(3000);
