const userDataValidator = (req, res, next) => {
    const { userEmail, password, nickname } = req.body;
    if (!userEmail || !password || !nickname) {
        return res.status(400).json({ message: '입력 데이터가 올바르지 않습니다. 모든 필드를 포함해야 합니다.' });
    }
    next();
};

const anotherMiddleware = (req, res, next) => {
    // 다른 미들웨어의 동작 코드
};

module.exports = {
    userDataValidator,
    anotherMiddleware
};