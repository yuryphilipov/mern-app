const Router = require("express");
const shortid = require("shortid");
const config = require("config");
const auth = require("../middleware/auth.middleware");
const Link = require("../models/Link");

const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");

    const { from } = req.body;
    const code = shortid.generate();

    const existing = await Link.findOne({ from, owner: req.user.userId });
    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + "/to/" + code;

    const link = new Link({ from, to, code, owner: req.user.userId });
    link.save();

    res.status(201).json({ link });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Что то пошло не так, попробуйте еще раз!" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Что то пошло не так, попробуйте еще раз!" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Что то пошло не так, попробуйте еще раз!" });
  }
});

router.get("/delete/:id", auth, async (req, res) => {
  try {
    const deleted = await Link.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Что то пошло не так, попробуйте еще раз!" });
  }
});

module.exports = router;
