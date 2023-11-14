import React from "react";
import "../styles/Category.css";

interface CategoryProps {
  title: string;
  category: string | number | string[];
  isCorrect: string;
}

function findCategoryClass(isCorrect: string) {
  switch (isCorrect) {
    case "=":
      return "category-correct";
    case ">":
      return "category-greater";
    case "<":
      return "category-lesser";
    case "=/=":
      return "category-partial";
    default:
      return "category-incorrect";
  }
}

function Category(props: CategoryProps) {
  const {title, category, isCorrect} = props;

  return (
    <div className="category-container">
      <div className={findCategoryClass(isCorrect)}>
        <p>{title}</p>
        <hr />
        {Array.isArray(category) ? (
          <p>{category.join("\n")}</p>
        ) : (
          <p>{category}</p>
        )}
      </div>
    </div>
  );
}

export default Category;
