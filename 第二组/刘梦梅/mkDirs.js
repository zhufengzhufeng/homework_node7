var fs = require('fs');
function mkDirs(path) {
    var ary = path.split('/');
    if (ary[0] != '') {
        if (!fs.exists(path)) {
            var cur = ary.slice(0, ary.length - 1);
            fs.mkdir(path, mkDirs(cur.join('/'))
            )
        }
    }
}
mkDirs('a/b/c/d');