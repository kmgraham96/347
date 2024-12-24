const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    // Serve the quiz form for GET requests
    if (req.method === 'GET') {
        fs.readFile('quiz.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error loading the quiz form');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    } 
    // Handle form submission (POST request)
    else if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const parsedData = querystring.parse(body);
            console.log('Form submitted: ', parsedData);

            // Respond with the submitted answers
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>Thank you for submitting the quiz!</h1>
                    <p>Question 1: ${parsedData.q1}</p>
                    <p>Question 2: ${parsedData.q2}</p>
                    <p>Question 3: ${parsedData.q3}</p>`);
        });
    } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
    }
});

const port = process.env.PORT || 3000;  // Use the PORT from the environment variable, or fallback to 3000 locally
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




