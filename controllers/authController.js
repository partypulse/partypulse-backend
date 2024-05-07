// POST-endpunkt för registrering
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Här ska du verifiera om användarens e-postadress redan finns i databasen
    // Om e-postadressen inte redan finns, spara den nya användaren i databasen
    // Exempel:
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
        } else if (user) {
            res.status(400).json({ message: 'Email already exists' });
        } else {
            const newUser = new User({ email, password });
            newUser.save((err, savedUser) => {
                if (err) {
                    res.status(500).json({ message: 'Failed to save user' });
                } else {
                    res.status(201).json({ message: 'User registered successfully' });
                }
            });
        }
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Här ska du verifiera användaruppgifterna mot databasen
    // Om uppgifterna är korrekta, generera ett JWT-token
    // Exempel:
    if (email === 'example@email.com' && password === 'password') {
        const user = { id: 1, email: email }; // Exempel på användarobjekt från databasen
        const token = generateToken(user);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});