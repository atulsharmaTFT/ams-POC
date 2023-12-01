export function generateMongoDBSchema(jsonData) {
  let schema = {};

  function parseObject(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        if (
          Array.isArray(obj[key]) &&
          obj[key].length > 0 &&
          typeof obj[key][0] === "object"
        ) {
          // For array of objects
          schema[key] = [generateSubSchema(obj[key][0])];
        } else {
          // For nested objects
          schema[key] = generateSubSchema(obj[key]);
        }
      } else {
        // For basic data types
        schema[key] = typeof obj[key];
      }
    }
  }

  function generateSubSchema(subObj) {
    let subSchema = {};
    for (let subKey in subObj) {
      subSchema[subKey] = typeof subObj[subKey];
    }
    return subSchema;
  }

  if (typeof jsonData === "object") {
    if (
      Array.isArray(jsonData) &&
      jsonData.length > 0 &&
      typeof jsonData[0] === "object"
    ) {
      schema = [generateSubSchema(jsonData[0])];
    } else {
      parseObject(jsonData);
    }
  }

  return schema;
}
