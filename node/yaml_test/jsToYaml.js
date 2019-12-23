var yaml = require('js-yaml');
var fs = require('fs');


var obj = {
    name: 'lili',
    age:18
}

try  {
    fs.writeFileSync(
        './example.yaml',
        yaml.dump(obj),
        'utf8'
    )
    const doc = yaml.safeLoad(fs.readFileSync('./test.yml', 'utf8'));
    doc.obj = obj
    console.log('doc', JSON.stringify(doc))

} catch ( error ) {
    console.log('error', error)
}