import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavigationBar from "./components/layout/NavigationBar";
import FooterApp from "./components/layout/FooterApp";
import HomePage from "./components/HomePage";
import {fetchData} from "./components/utils/fetchData";
import CategoryCoursesList from "./components/CategoryCoursesList";
import CourseRenderedPage from "./components/CourseRenderedPage";

import "./css/main.css";

export interface Course {
    id: number;
    name: string;
    file_path: string;
    image: string;

}

export interface CourseCategory {
    id: number;
    name: string;
    image: string;
    courses: Course[];
}


const App: React.FC = () => {
        const [categories, setCategories] = useState<CourseCategory[]>([]);

        useEffect(() => {
            fetchData(`${process.env.PUBLIC_URL}/allCourses/courses_mapping.json`)
                .then((data) => setCategories(data))
                .catch((error) => console.error(error));
        }, []);

        if (categories.length === 0) {
            return <div></div>;
        }

        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <NavigationBar categories={[...new Set(categories.map((item) => item.name))]}/>
                <Routes>
                    <Route path={`${process.env.PUBLIC_URL}`} element={<HomePage categories={categories}/>}/>
                    {categories.map((category) =>
                        <Route
                            path={category.name}
                            element={<CategoryCoursesList category={category}/>}
                            key={`category-route-${category}`}
                        />
                    )};
                    {categories.map((category) =>
                        category.courses.map((course) =>
                            <Route
                                path={`${category.name}/${course.name}`}
                                element={<CourseRenderedPage course={course}/>}
                                key={`course-route-${course}`}
                            />
                        )
                    )};
                </Routes>
                <FooterApp/>
            </BrowserRouter>
        );
    }
;

export default App;
