const http = require('http');

async function test() {
    // 1. Start Chat
    const startReq = http.request({
        hostname: 'localhost',
        port: 3000,
        path: '/api/chat/start',
        method: 'POST',
    }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            console.log('Start Chat Raw:', data);
            try {
                const { sessionId } = JSON.parse(data);
                console.log('Session ID:', sessionId);
                sendMessage(sessionId);
            } catch (e) { console.error(e); }
        });
    });
    startReq.end();
}

function sendMessage(sessionId) {
    const postData = JSON.stringify({
        message: 'Hello, who are you?',
        sessionId: sessionId
    });

    const req = http.request({
        hostname: 'localhost',
        port: 3000,
        path: '/api/chat/message',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            console.log('Response:', data);
        });
    });

    req.write(postData);
    req.end();
}

test();
