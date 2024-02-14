export const notFound = (req, res, next) => {
    const error = new Error(`NOt Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE.ENV === "production" ? null : err.stack,
    });
};
