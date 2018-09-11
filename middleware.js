//@ts-check
function parseQueryCaseInsensitive() {
    return (req, res, next) => {
        for (var key in req.query) {
            req.query[key] = req.query[key].toLowerCase();
            req.query[key.toLowerCase()] = req.query[key];
        }
        next();			//becouse it's a middleware
    };
}

exports.parseQueryCaseInsensitive = parseQueryCaseInsensitive;