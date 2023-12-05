const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Joi = require("joi");
const Fields = require("./schemas/fields");
const FieldGroups = require("./schemas/fieldGroups");
const Products = require("./schemas/products");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/AMS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const options1 = Joi.object({
  option: Joi.string().min(1).required(),
  checked: Joi.boolean().valid(false).required(),
});

const options2 = Joi.object({
  value: Joi.string().min(1).required(),
  label: Joi.string().min(1).required(),
});

const validateFields = Joi.object({
  name: Joi.string().required(),
  variable: Joi.string().required(),
  type: Joi.string()
    .valid(
      "text",
      "radio",
      "checkbox",
      "dropdown",
      "date",
      "toggle",
      "multiSelect",
      "slider",
      "number"
    )
    .required(),
  description: Joi.string().default(""),
  placeholder: Joi.string().default(""),
  checkboxOptions: Joi.array()
    .items(options1)
    .default([])
    .when("type", {
      is: "checkbox",
      then: Joi.array().items(options1).required().min(1),
    }),
  radioOptions: Joi.array()
    .items(options1)
    .default([])
    .when("type", {
      is: "radio",
      then: Joi.array().items(options1).required().min(1),
    }),
  dropdownOptions: Joi.array()
    .items(options2)
    .default([])
    .when("type", {
      is: "dropdown",
      then: Joi.array().items(options2).required().min(1),
    }),
  dateOptions: Joi.object({
    format: Joi.string().valid("YYYY-MM-DD"),
    minDate: Joi.date().required(),
    maxDate: Joi.date().required(),
  }).when("type", {
    is: "date",
    then: Joi.object({
      format: Joi.string().valid("YYYY-MM-DD").required(),
      minDate: Joi.date().required(),
      maxDate: Joi.date().required(),
    }).required(),
  }),
  toggleDefault: Joi.boolean().default(false),
  multiSelectOptions: Joi.array()
    .items(options2)
    .default([])
    .when("type", {
      is: "multiSelect",
      then: Joi.array().items(options2).required().min(1),
    }),
  sliderOptions: Joi.object({
    min: Joi.number().required(),
    max: Joi.number().required(),
    step: Joi.number().required(),
  }).when("type", {
    is: "slider",
    then: Joi.object({
      min: Joi.number().required(),
      max: Joi.number().required(),
      step: Joi.number().required(),
    }).required(),
  }),
});
const corsOptions = { exposedHeaders: "Authorization" };
app.use(cors(corsOptions));

app.post("/fields", async (req, res) => {
  const { error, value } = validateFields.validate(req.body);

  try {
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const newField = new Fields(value);
      await newField.save();
      res.status(201).json(newField);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/fields", async (req, res) => {
  try {
    const fields = await Fields.find();
    res.status(200).json(fields);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

const validateFieldGroups = Joi.object({
  name: Joi.string().required(),
  variable: Joi.string().required(),
  fields: Joi.array()
    .items(
      Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      })
    )
    .min(1)
    .required(),
});

app.post("/field-groups", async (req, res) => {
  try {
    const { error, value } = validateFieldGroups.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, fields, variable } = value;

    const isValidFields =
      (await Fields.countDocuments({ _id: { $in: fields } })) === fields.length;
    if (!isValidFields) {
      return res.status(400).json({ error: "Invalid fields provided" });
    }

    const newFieldGroup = new FieldGroups({
      name,
      fields,
      variable,
    });

    await newFieldGroup.save();
    res.status(201).json(newFieldGroup);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/field-groups", async (req, res) => {
  try {
    const aggregate = FieldGroups.aggregate([
      {
        $lookup: {
          from: "fields",
          localField: "fields",
          foreignField: "_id",
          as: "fieldsArr",
        },
      },
      {
        $addFields: {
          fields: {
            $map: {
              input: "$fieldsArr",
              as: "field",
              in: {
                name: "$$field.name",
                variable: "$$field.variable",
                _id: "$$field._id",
              },
            },
          },
        },
      },
      {
        $project: {
          fieldsArr: 0,
        },
      },
    ]);

    const fieldGroups = await aggregate.exec();
    res.status(200).json(fieldGroups);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

const validateProducts = Joi.object({
  name: Joi.string().required(),
  variable: Joi.string().required(),
  fieldGroups: Joi.array()
    .items(
      Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      })
    )
    .min(1)
    .required(),
});

app.post("/products", async (req, res) => {
  try {
    const { error, value } = validateProducts.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, fieldGroups, variable } = value;

    const isValidFields =
      (await FieldGroups.countDocuments({ _id: { $in: fieldGroups } })) ===
      fieldGroups.length;
    if (!isValidFields) {
      return res.status(400).json({ error: "Invalid field groups provided" });
    }

    const newProduct = new Products({
      name,
      fieldGroups,
      variable,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const aggregate = Products.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $unwind: "$fieldGroups",
    },
    {
      $lookup: {
        from: "fieldGroups",
        localField: "fieldGroups",
        foreignField: "_id",
        as: "fieldGroupsArr",
      },
    },
    {
      $unwind: "$fieldGroupsArr",
    },
    {
      $replaceRoot: {
        newRoot: "$fieldGroupsArr",
      },
    },
    {
      $unwind: "$fields",
    },
    {
      $lookup: {
        from: "fields",
        localField: "fields",
        foreignField: "_id",
        as: "productFields",
      },
    },
    {
      $unwind: "$productFields",
    },
    {
      $replaceRoot: {
        newRoot: "$productFields",
      },
    },
  ]);

  const fields = await aggregate.exec();

  const { name, variable, createdAt, updatedAt } = await Products.findById(
    productId,
    {
      fieldGroups: 0,
    }
  );

  res.status(200).json({
    _id: productId,
    name,
    variable,
    createdAt,
    updatedAt,
    fields,
  });
});

// Start the server
app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
