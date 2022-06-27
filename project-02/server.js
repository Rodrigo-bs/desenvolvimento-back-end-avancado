const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {

    const file = req.url === '/' ? 'index.html' : req.url;
    const filePath = path.join(__dirname, 'public', file);

    const extName = path.extname(filePath);
    const allowedExtensions = ['.html', '.js', '.css'];

    const allowed = allowedExtensions.find(item => item == extName);

    if (!allowed) return

    if (req.url === '/')
        fs.readFile(
            filePath,
            (err, content) => {
                if (err) throw err

                res.end(content)
            }
        )
    
}).listen(5000, () => { console.log('Server is running.') })
