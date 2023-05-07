import React from "react";
import CourseList from "../allCourses/listCourses";
import CardCourse from "./CardCourse";

interface ListCoursesProps {
  category: string;
}

const ListCourses: React.FC<ListCoursesProps> = ({ category }) => {
  console.log("hey i am rendering framework");

  const frameworkCoursesList = CourseList.filter(
    (course) => course.category === category
  );

  const cards = frameworkCoursesList.map((singleCourse) => {
    return <CardCourse course={singleCourse} key={singleCourse.id} />;
  });

  return (
    <div>
      <h1 className="list-courses-text" >some Courses:</h1>
      <div className="general-visualisation-list-courses">{cards}</div>
    </div>
  );
};

export default ListCourses;
