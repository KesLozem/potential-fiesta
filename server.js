// Main server file for the application.

// express http server
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { instrument } = require("@socket.io/admin-ui");
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const sqliteStoreFactory = require('express-session-sqlite').default;
const uuid = require('uuid').v4;

// db
const SqliteStore = sqliteStoreFactory(session);
const store = new SqliteStore({
  driver: sqlite3.Database,
  path: './tmp/sessions.db',
  ttl: 3600000,
});

const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer(app)
const io = new Server(httpServer, {
  serveClient: false,
  cors: {
    origin: ["http://localhost:8080/", "https://admin.socket.io"],
    origin: '*',
    credentials: true,
  }
});
const port = process.env.PORT || 8080;

// Socket.io Admin UI - for development purposes
instrument(io, {
  auth: false,
  mode: "development",
});

// Socket events
let playbackState = {};

io.on('connection', (socket) => {
  io.emit('PlaybackState', playbackState);
  socket.on('PlaybackState:Latest', (state) => {
    playbackState = state;
    io.emit('PlaybackState', state);
  });

  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  genid: (req) => {
    console.log('SESSION ID', req.sessionID);
    return uuid();
  },
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: false,
  cookie: { sameSite: 'none' },
  maxAge: 3600000, // 1 hour
  store
}));

// routes
const apiRoutes = require('./routing/api/root');
const partyRoutes = require('./routing/party/root');
const userRoutes = require('./routing/user/root')

app.use('/api', apiRoutes);
app.use('/party', partyRoutes);
app.use('/user', userRoutes);

app.use(express.static(path.join(__dirname, '/dist')));
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '/dist')});
});

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
