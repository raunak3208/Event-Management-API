// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
    const user = req.user;
    console.log('user', user);
    if (!user || user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only."
        });
    }
    next();
};