try {
    const http = require("http");
    const app = require('./app');
    const server = http.createServer(app);

    server.listen(3000, function () {
        console.log("Server running at http://localhost:3000");
    });   
} catch (error) {
    console.log(error);
}