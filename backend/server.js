const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Joi = require("joi");
const Fields = require("./schemas/fields");
const FieldGroups = require("./schemas/fieldGroups");
const Products = require("./schemas/products");
const Assets = require("./schemas/assets");
const cors = require("cors");
const { getJoiSchema, testValidation } = require("./validationHandler")
const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://0.0.0.0:27017/AMS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const validateId = Joi.string()
  .custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  })
  .messages({
    "any.invalid": "Invalid Id",
  });




const options1 = Joi.object({
  option: Joi.string().min(1).required(),
  checked: Joi.boolean().required(),
});

const options2 = Joi.object({
  value: Joi.string().min(1).required(),
  label: Joi.string().min(1).required(),
});

const validateFields = Joi.object({
  name: Joi.string().trim().required(),
  variable: Joi.string().trim().required(),
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
  validations: Joi.object({
    validationType: Joi.string(),
    isRequired: Joi.boolean(),
    min: Joi.number(),
    max: Joi.number()
  }),
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
const corsOptions = {
  exposedHeaders: "Authorization",
  methods: "GET,POST,PATCH,PUT,DELETE",
};
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
    if (e.message.startsWith("E11000")) {
      return res.status(409).json({
        error: `Duplicate Variable`,
      });
    }
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
    .unique()
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
    .unique()
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

const validateEditAProduct = Joi.object({
  name: Joi.string().required(),
  fieldGroups: Joi.array()
    .items(
      Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      })
    )
    .unique()
    .min(1)
    .required(),
});

app.put("/products/:id", async (req, res) => {
  try {
    const { error, value } = validateEditAProduct.validate(req.body);
    const { error: invalidIdError, value: productId } = validateId.validate(
      req.params.id
    );
    const badRequestError = invalidIdError || error;
    if (badRequestError) {
      return res
        .status(400)
        .json({ error: badRequestError.details[0].message });
    }

    const { name, fieldGroups } = value;

    const isValidFieldGroups =
      (await FieldGroups.countDocuments({ _id: { $in: fieldGroups } })) ===
      fieldGroups.length;
    if (!isValidFieldGroups) {
      return res.status(400).json({ error: "Invalid field groups provided" });
    }

    const doc = await Products.updateOne(
      { _id: productId },
      {
        name,
        fieldGroups,
      }
    );

    if (doc.matchedCount === 0) {
      return res.status(400).json({ error: `Wrong Product Id ${productId}` });
    }

    res.status(204).json();
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

const validateGetAProduct = Joi.object({
  id: validateId.required(),
  withFieldGroups: Joi.boolean().required(),
});

app.get("/products/:id", async (req, res) => {
  try {
    const { error, value } = validateGetAProduct.validate({
      id: req.params.id,
      withFieldGroups: req.query.withFieldGroups,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id: productId, withFieldGroups } = value;

    const product = await Products.findById(productId, {
      fieldGroups: 0,
    });

    if (!product) {
      return res.status(404).json({ error: "Not found" });
    }

    const commonAggregate = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(productId),
        },
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
    ];

    const aggregate = Products.aggregate([
      ...commonAggregate,
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

    const { name, variable, createdAt, updatedAt } = product;

    const response = {
      _id: productId,
      name,
      variable,
      createdAt,
      updatedAt,
      fields,
    };

    if (withFieldGroups) {
      const aggregate1 = Products.aggregate([...commonAggregate]);
      const fieldGroups = await aggregate1.exec();
      response.fieldGroups = fieldGroups;
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

const validateAssets = Joi.object({
  name: Joi.string().required(),
  image: Joi.string(),
  tag: Joi.string().required(),
  price: Joi.number().required(),
  purchaseDate: Joi.date().iso().required(),
  assignedTo: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }),
  productId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
  data: Joi.object()
    .pattern(
      Joi.string(),
      Joi.alternatives().try(
        Joi.date().iso(),
        Joi.string().min(1),
        Joi.array().items(options1).min(1),
        Joi.array().items(options2).min(1),
        options1,
        options2,
        Joi.number(),
        Joi.boolean()
      )
    )
    .required(),
});

app.post("/assets", async (req, res) => {
  try {
    const { error, value } = validateAssets.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const {
      name,
      image,
      tag,
      price,
      purchaseDate,
      assignedTo,
      productId,
      data,
    } = value;

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

    if (!fields.length) {
      return res.status(400).json({ error: "Invalid productId" });
    } else if (fields.length !== Object.keys(data).length) {
      return res
        .status(400)
        .json({ error: "Please send the correct number of attributes" });
    }

    const validateData = Joi.object({
      type: Joi.string().required(),
      value: Joi.any()
        .when("type", {
          is: "radio",
          then: options1.required(),
        })
        .when("type", {
          is: "checkbox",
          then: Joi.array().items(options1).required(),
        })
        .when("type", {
          is: "number",
          then: Joi.number().required(),
        })
        .when("type", {
          is: "toggle",
          then: Joi.boolean().required(),
        })
        .when("type", {
          is: "multiSelect",
          then: Joi.array().items(options2).required(),
        })
        .when("type", {
          is: "text",
          then: Joi.string().required(),
        })
        .when("type", {
          is: "dropdown",
          then: options2.required(),
        })
        .when("type", {
          is: "slider",
          then: Joi.string().required(),
        })
        .when("type", {
          is: "date",
          then: Joi.date().iso().required(),
        }),
    });

    // *********************** Joi Validation ******************************* 
    let getSchema = getJoiSchema(fields);
    const CheckData = testValidation(getSchema, data)
    // *********************** Joi Validation *******************************

    for (const field of fields) {
      if (!data[field.variable]) {
        return res
          .status(400)
          .json({ error: `Missing field ${field.variable}` });
      } else {


        const newData = { type: field.type, value: data[field.variable] };

        const result = validateData.validate(newData);

        if (result.error) {
          return res.status(400).json({
            error: `Please provide correct value for attribute ${field.variable}`,
          });
        }
      }
    }

    const newAsset = new Assets({
      name,
      image,
      tag,
      price,
      purchaseDate,
      assignedTo,
      productId,
      data,
    });

    await newAsset.save();
    res.status(201).json(newAsset);
  } catch (error) {
    if (error.message.startsWith("E11000")) {
      return res.status(409).json({
        error: `Duplicate Tag`,
      });
    }
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/assets/:id", async (req, res) => {
  try {
    const { error, value } = validateAssets.validate(req.body);
    const { error: invalidIdError, value: assetId } = validateId.validate(
      req.params.id
    );
    const badRequestError = invalidIdError || error;
    if (badRequestError) {
      return res
        .status(400)
        .json({ error: badRequestError.details[0].message });
    }

    const {
      name,
      image,
      tag,
      price,
      purchaseDate,
      assignedTo,
      productId,
      data,
    } = value;

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

    if (!fields.length) {
      return res.status(400).json({ error: "Invalid productId" });
    } else if (fields.length !== Object.keys(data).length) {
      return res
        .status(400)
        .json({ error: "Please send the correct number of attributes" });
    }

    const validateData = Joi.object({
      type: Joi.string().required(),
      value: Joi.any()
        .when("type", {
          is: "radio",
          then: options1.required(),
        })
        .when("type", {
          is: "checkbox",
          then: Joi.array().items(options1).required(),
        })
        .when("type", {
          is: "number",
          then: Joi.number().required(),
        })
        .when("type", {
          is: "toggle",
          then: Joi.boolean().required(),
        })
        .when("type", {
          is: "multiSelect",
          then: Joi.array().items(options2).required(),
        })
        .when("type", {
          is: "text",
          then: Joi.string().required(),
        })
        .when("type", {
          is: "dropdown",
          then: options2.required(),
        })
        .when("type", {
          is: "slider",
          then: Joi.string().required(),
        })
        .when("type", {
          is: "date",
          then: Joi.date().iso().required(),
        }),
    });

    for (const field of fields) {
      if (!data[field.variable]) {
        return res
          .status(400)
          .json({ error: `Missing field ${field.variable}` });
      } else {
        const newData = { type: field.type, value: data[field.variable] };

        const result = validateData.validate(newData);

        if (result.error) {
          return res.status(400).json({
            error: `Please provide correct value for attribute ${field.variable}`,
          });
        }
      }
    }

    const doc = await Assets.updateOne(
      { _id: assetId },
      {
        name,
        image,
        tag,
        price,
        purchaseDate,
        assignedTo,
        productId,
        data,
      }
    );

    if (doc.matchedCount === 0) {
      return res.status(400).json({ error: `Wrong Asset Id ${assetId}` });
    }

    res.status(204).json();
  } catch (error) {
    if (error.message.startsWith("E11000")) {
      return res.status(409).json({
        error: `Duplicate Tag`,
      });
    }
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/assets/:id", async (req, res) => {
  try {
    const { error, value } = validateAssets.validate(req.body);
    const { error: invalidIdError, value: assetId } = validateId.validate(
      req.params.id
    );
    const badRequestError = invalidIdError || error;
    if (badRequestError) {
      return res
        .status(400)
        .json({ error: badRequestError.details[0].message });
    }

    const {
      name,
      image,
      tag,
      price,
      purchaseDate,
      assignedTo,
      productId,
      data,
    } = value;

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

    if (!fields.length) {
      return res.status(400).json({ error: "Invalid productId" });
    } else if (fields.length !== Object.keys(data).length) {
      return res
        .status(400)
        .json({ error: "Please send the correct number of attributes" });
    }

    const validateData = Joi.object({
      type: Joi.string().required(),
      value: Joi.any()
        .when("type", {
          is: "radio",
          then: options1.required(),
        })
        .when("type", {
          is: "checkbox",
          then: Joi.array().items(options1).required(),
        })
        .when("type", {
          is: "number",
          then: Joi.number().required(),
        })
        .when("type", {
          is: "toggle",
          then: Joi.boolean().required(),
        })
        .when("type", {
          is: "multiSelect",
          then: Joi.array().items(options2).required(),
        })
        .when("type", {
          is: "text",
          then: Joi.string().required(),
        })
        .when("type", {
          is: "dropdown",
          then: options2.required(),
        })
        .when("type", {
          is: "slider",
          then: Joi.string().required(),
        })
        .when("type", {
          is: "date",
          then: Joi.date().iso().required(),
        }),
    });

    for (const field of fields) {
      if (!data[field.variable]) {
        return res
          .status(400)
          .json({ error: `Missing field ${field.variable}` });
      } else {
        const newData = { type: field.type, value: data[field.variable] };

        const result = validateData.validate(newData);

        if (result.error) {
          return res.status(400).json({
            error: `Please provide correct value for attribute ${field.variable}`,
          });
        }
      }
    }

    const doc = await Assets.updateOne(
      { _id: assetId },
      {
        name,
        image,
        tag,
        price,
        purchaseDate,
        assignedTo,
        productId,
        data,
      }
    );

    if (doc.matchedCount === 0) {
      return res.status(400).json({ error: `Wrong Asset Id ${assetId}` });
    }

    res.status(204).json();
  } catch (error) {
    if (error.message.startsWith("E11000")) {
      return res.status(409).json({
        error: `Duplicate Tag`,
      });
    }
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(10),
});

const validateGetAllAssets = paginationSchema.keys({
  archived: Joi.boolean().required(),
});

app.get("/assets", async (req, res) => {
  try {
    const { error, value } = validateGetAllAssets.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { page = 1, limit = 10, archived } = value;
    const skip = (page - 1) * limit;

    const aggregate = Assets.aggregate([
      {
        $match: {
          isArchived: archived,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "fieldGroups",
          localField: "products.fieldGroups",
          foreignField: "_id",
          as: "fieldGroupsArr",
        },
      },
      {
        $addFields: {
          fields: {
            $reduce: {
              input: "$fieldGroupsArr",
              initialValue: [],
              in: {
                $concatArrays: ["$$value", "$$this.fields"],
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "fields",
          localField: "fields",
          foreignField: "_id",
          as: "fields",
        },
      },
      {
        $addFields: {
          fields: {
            $map: {
              input: "$fields",
              as: "field",
              in: {
                name: "$$field.name",
                variable: "$$field.variable",
                _id: "$$field._id",
                type: "$$field.type",
              },
            },
          },
        },
      },
      {
        $project: {
          fieldGroupsArr: 0,
          products: 0,
        },
      },
    ]);
    const assets = await aggregate.exec();
    const count = await Assets.countDocuments({ isArchived: archived });

    res.status(200).json({
      assets,
      total: count,
      limit,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/assets/:id", async (req, res) => {
  try {
    const { error, value } = validateId.validate(req.params.id);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const assetId = value;

    const aggregate = Assets.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(assetId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "fieldGroups",
          localField: "products.fieldGroups",
          foreignField: "_id",
          as: "fieldGroupsArr",
        },
      },
      {
        $addFields: {
          fields: {
            $reduce: {
              input: "$fieldGroupsArr",
              initialValue: [],
              in: {
                $concatArrays: ["$$value", "$$this.fields"],
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "fields",
          localField: "fields",
          foreignField: "_id",
          as: "fields",
        },
      },
      {
        $project: {
          fieldGroupsArr: 0,
          products: 0,
        },
      },
    ]);
    const assets = await aggregate.exec();

    if (!assets.length) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(assets[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/assets/:id", async (req, res) => {
  try {
    const { error, value } = validateId.validate(req.params.id);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const assetId = value;

    const asset = await Assets.findOne({ _id: assetId });

    if (asset?.isInInventory) {
      return res.status(400).json({ error: "Asset is in Inventory" });
    }

    await Assets.deleteOne({ _id: assetId });

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/assets/:id/move-to-inventory", async (req, res) => {
  try {
    const { error, value } = validateId.validate(req.params.id);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const assetId = value;

    const doc = await Assets.updateOne(
      { _id: assetId },
      {
        isInInventory: true,
      }
    );

    if (doc.matchedCount === 0) {
      return res.status(400).json({ error: `Wrong Asset Id ${assetId}` });
    }

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/assets/:id/move-to-archive", async (req, res) => {
  try {
    const { error, value } = validateId.validate(req.params.id);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const assetId = value;

    const asset = await Assets.findOne({ _id: assetId });

    if (!asset?.isInInventory) {
      return res.status(400).json({ error: "Asset is not in Inventory" });
    }

    await Assets.updateOne(
      { _id: assetId },
      {
        isArchived: true,
      }
    );

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/assets/products/:id", async (req, res) => {
  try {
    const { error: paginationError, value } = paginationSchema.validate(
      req.query
    );
    const { error, value: productId } = validateId.validate(req.params.id);
    const badRequestError = error || paginationError;
    if (badRequestError) {
      return res
        .status(400)
        .json({ error: badRequestError.details[0].message });
    }

    const { page = 1, limit = 10 } = value;
    const skip = (page - 1) * limit;

    const aggregate = Assets.aggregate([
      {
        $match: {
          productId: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "fieldGroups",
          localField: "products.fieldGroups",
          foreignField: "_id",
          as: "fieldGroupsArr",
        },
      },
      {
        $addFields: {
          fields: {
            $reduce: {
              input: "$fieldGroupsArr",
              initialValue: [],
              in: {
                $concatArrays: ["$$value", "$$this.fields"],
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "fields",
          localField: "fields",
          foreignField: "_id",
          as: "fields",
        },
      },
      {
        $project: {
          fieldGroupsArr: 0,
          products: 0,
        },
      },
    ]);
    const assets = await aggregate.exec();
    const count = await Assets.countDocuments({ productId });

    res.status(200).json({
      assets,
      total: count,
      limit,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
