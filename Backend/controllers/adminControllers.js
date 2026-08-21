import jwt from "jsonwebtoken";

const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        console.log("===== ADMIN LOGIN =====");
        console.log("Received email:", email);
        console.log("ENV email:", process.env.ADMIN_EMAIL);
        console.log("Password received:", !!password);
        console.log("ENV password exists:", !!process.env.ADMIN_PASSWORD);

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {

            console.log("✅ ADMIN CREDENTIALS MATCH");

            const token = jwt.sign(
                { email },
                process.env.JWT_SECRET
            );

            return res.json({
                success: true,
                message: "Login Successful",
                token
            });

        } else {

            console.log("❌ ADMIN CREDENTIALS DO NOT MATCH");

            return res.json({
                success: false,
                message: "Invalid Credentials"
            });
        }

    } catch (error) {

        console.log("❌ ADMIN LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export { loginAdmin };