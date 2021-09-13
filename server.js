const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
    console.log("Root");
});

app.get('/express_backend', (req, res) => {
    res.send({check_status: true});
});

app.post('/game_room', function (req, res) {
    // let room_id = req.params.room_id;
    const client_board = req.body;
    console.log(client_board);
    const filename = 'client/match_board/board.json';
    if (!fs.existsSync(filename)) {
        fs.writeFileSync(filename, JSON.stringify({
            "board": client_board,
        }));
        res.send({
            board: client_board,
            init: true,
        });
        console.log("Not exists, done");
    } else {    
        let file = fs.readFileSync(filename, 'utf-8');
        cont = JSON.parse(file);
        cont["board"] = client_board;
        fs.writeFileSync(filename, JSON.stringify(cont));
        res.send({
            board: cont["board"],
            init: false,
        });
        console.log("Exists, done");
    }
    let file = fs.readFileSync(filename, 'utf-8');
    cont = JSON.parse(file);
    console.log("Server board length: ", cont["board"].length);
});

app.delete('/game_room', function (req, res) {
    const filename = 'client/match_board/board.json';
    fs.unlinkSync(filename, function(err) {
        if (err) throw err;
        console.log("File deleted!");
    });
});