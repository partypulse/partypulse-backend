

// POST create a new order
exports.login = async (req, res) => {
    console.log(req.body)
    try {
        res.status(201).json({token:"6t45gd4ft4t5tdtr5t5frd4d4"});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};