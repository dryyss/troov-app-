const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Tentative de création utilisateur:", { name, email });

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("Email déjà utilisé:", email);
      return res.status(400).json({
        message: "Un utilisateur avec cet email existe déjà",
      });
    }

    // Créer un nouvel utilisateur
    const user = await User.create({
      name,
      email,
      password,
    });

    console.log("Utilisateur créé avec succès:", user.email);

    res.status(201).json({
      message: "Inscription réussie",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erreur création utilisateur:", error);
    res.status(500).json({
      message: error.message || "Erreur lors de l'inscription",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    console.log("User found:", user.email);
    console.log("Attempting password comparison");

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    // Générer le token
    const token = generateToken(user._id);
    console.log("Login successful for:", email);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};
