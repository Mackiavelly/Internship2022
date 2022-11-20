const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = {
    init(app) {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms', {
            skip: (req, res) => !(['::1', 'localhost', '127.0.0.1'].includes(req.ip) || res.statusCode !== 200),
        }));

        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Credentials', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials',
            );
            next();
        });
    },
};
