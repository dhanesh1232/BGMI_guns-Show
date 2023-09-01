const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ImageSchema = require("./imgModel.js");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.listen(3014, () =>
  console.log("Server Started in this http://localhost:3014.......")
);
mongoose
  .connect(
    "mongodb+srv://dhaneshreddy980:taskImage143@imgtask.gcwdumw.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected....."))
  .catch((error) => console.error("DB Connection Error:", error));

app.post("/api/upload_image", async (req, res) => {
  try {
    const { gunName, description, imageUrl, gunPower, gunType, gunAmmo } =
      req.body;
    const exist = await ImageSchema.findOne({ gunName });
    if (exist) {
      res.status(400).json("Gun Name Already Exists");
    }

    if (
      imageUrl === "" ||
      gunPower === "" ||
      gunName === "" ||
      description === "" ||
      gunAmmo === "" ||
      gunType === 0
    ) {
      res.status(400).json({ error: "All fields are required" });
    }

    const newImage = new ImageSchema({
      name: gunName,
      image_url: imageUrl,
      gun_power: gunPower,
      description: description,
      gun_type: gunType,
      gun_ammo: gunAmmo,
      is_like: false,
      like_count: 0,
    });
    await newImage.save();
    return res.json(await ImageSchema.find());
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/api/imageShow/", async (req, res) => {
  try {
    const { search_v, ammo_type, class_type } = req.query;
    const query = {
      name: new RegExp(search_v, "i"),
    };
    if (ammo_type) {
      query.gun_ammo = ammo_type;
    }
    if (class_type) {
      query.gun_type = class_type;
    }
    const imagesView = await ImageSchema.find(query);
    return res.json(imagesView);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
app.delete("/delete-item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ImageSchema.deleteOne({ _id: id });
    return res.json(await ImageSchema.find());
  } catch (error) {
    res.send("Internal Server Error").status(500);
  }
});
