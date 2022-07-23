const loginService = require('../services/login');
const httpStatus = require('../helpers/statusCode');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await loginService(email, password);
        console.log(result);
    res.status(httpStatus.success).json({ token: result });
    } catch (err) {
        res.status(httpStatus[err.code]).json({ message: err.message });
    }
};

module.exports = login;