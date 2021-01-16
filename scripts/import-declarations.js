const path = require('path');
const fs = require('fs');
const declarationsSourcePath = path.resolve(process.cwd(), 'src', 'global.d.ts');
const declarationsDistPath = path.resolve(process.cwd(), 'dist', 'courier.d.ts');

fs.readFile(declarationsSourcePath, 'utf8', (err, data) => {
    if (err) throw err;
    const content = data.replace(/\.\//g, '../src/');
    fs.writeFile(declarationsDistPath, content, 'utf8', (err) => {
        if (err) throw err;
        console.log('The declarations file added');
    });
});


