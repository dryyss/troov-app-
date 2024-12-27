const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Génération du token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Inscription
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Un utilisateur avec cet email existe déjà",
      });
    }

    // Créer un nouvel utilisateur
    const user = new User({
      email,
      password,
      firstName,
      lastName,
    });

    await user.save();

    // Générer le token
    const token = generateToken(user._id);

    res.status(201).json({
      message: "Inscription réussie",
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({
      message: "Erreur lors de l'inscription",
      error: error.message,
    });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    // Générer le token
    const token = generateToken(user._id);

    res.json({
      message: "Connexion réussie",
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({
      message: "Erreur lors de la connexion",
      error: error.message,
    });
  }
};

// Obtenir le profil de l'utilisateur connecté
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }
    res.json(user.toJSON());
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    res.status(500).json({
      message: "Erreur lors de la récupération du profil",
      error: error.message,
    });
  }
};
