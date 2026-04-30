const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./app').filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let originalContent = content;
    
    // Undo the nested template literal replacement
    content = content.replace(/\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:3002'\}/g, "http://localhost:3002");
    
    // Undo the nested parenthesis string replacement
    content = content.replace(/\(process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:3002'\)/g, "'http://localhost:3002'");
    
    if (content !== originalContent) {
        fs.writeFileSync(f, content);
        console.log('Fixed ' + f);
    }
});
