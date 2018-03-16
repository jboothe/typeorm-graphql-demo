import * as path from "path";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";

const typesArray = fileLoader(path.join(__dirname, "./"));

const typesMerged = mergeTypes(typesArray, { all: false });

console.log("typesMerged", typesMerged);

export default typesMerged;
