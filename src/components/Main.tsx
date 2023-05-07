import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import FooterApp from "./FooterApp";
import ListCourses from "./ListCourses";
import LandingPage from "./LandingPage";
import SingleDetailCourse from "./SingleDetailCourse";



const Main: React.FC = () => {

  const allCategories = ["framework", "machine-learning", "databases", "generals", "devOPS"]; //Categories
 


  return (
    <BrowserRouter>
    <NavigationBar/>
      <Routes>
        <Route path="course/:category/:courseName" element={<SingleDetailCourse/>} /> 
        <Route path="/" element={<LandingPage />} /> 
        {allCategories.map((category) =>  <Route path={category} element={<ListCourses category={category} />}/> )};
      </Routes>
      <FooterApp/>
    </BrowserRouter>
  );
};

export default Main;

