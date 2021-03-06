const { Router } = require("express");
const Link = require("../models/Link");

const router = Router();

router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      link.clicks++;
      link.save();
      res.redirect(link.from);
    }

    return res.status(404).json({ message: "Ссылка не найдена" });
  } catch (e) {}
});

module.exports = router;
