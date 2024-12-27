const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
  },
  {
    timestamps: true,
  }
);

// Hash le mot de passe avant de sauvegarder
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Méthode pour vérifier le mot de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    console.log("Comparing passwords for:", this.email);
    console.log("Stored hash:", this.password);
    console.log("Candidate password:", candidatePassword);
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log("Password match result:", isMatch);
    return isMatch;
  } catch (error) {
    console.error("Password comparison error:", error);
    throw error;
  }
};

module.exports = mongoose.model("User", userSchema);
