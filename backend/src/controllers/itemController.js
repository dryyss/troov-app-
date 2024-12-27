const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      owner: req.user.id, // Sera défini par le middleware d'auth
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("owner", "name email");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Objet non trouvé" });
    }

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!item) {
      return res.status(404).json({ message: "Objet non trouvé" });
    }

    res.json({ message: "Objet supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
