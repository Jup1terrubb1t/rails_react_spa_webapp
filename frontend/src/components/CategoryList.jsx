// src/components/CategoryList.jsx
import { CheckboxGroup } from "@chakra-ui/react";
import Category from "./Category";

const CategoryList = ({ categories }) => {
  return (
    <CheckboxGroup>
      {categories.map((cat) => (
        <Category key={cat.id} name={cat.name} />
      ))}
    </CheckboxGroup>
  );
};
export default CategoryList;
