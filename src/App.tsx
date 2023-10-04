import React, {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import NavigationBar from "./components/layout/NavigationBar";
import FooterApp from "./components/layout/FooterApp";
import HomePage from "./components/HomePage";
import {fetchData} from "./components/utils/fetchData";
import CategoryCoursesList from "./components/CategoryCoursesList";
import CourseRenderedPage from "./components/CourseRenderedPage";
import {HashRouter} from 'react-router-dom';

import "./css/main.css";
import CourseTopicsList from "./CourseTopicsList";

export interface Topic {
    id: number;
    name: string;
    file_path: string;
    image: string;
}

export interface Course {
    id: number;
    name: string;
    file_path: string;
    image: string;
    topics: Topic[];
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
            <HashRouter>
                <NavigationBar categories={[...new Set(categories.map((item) => item.name))]}/>
                <Routes>
                    <Route path="/" element={<HomePage categories={categories}/>}/>
                    {categories.map((category) =>
                        <Route
                            path={category.name}
                            element={<CategoryCoursesList category={category}/>}
                            key={`category-route-${category}`}
                        />
                    )};

                    {categories.map((category) =>
                        category.courses.map((course) => {
                            return (
                                <React.Fragment key={`course-route-${course}`}>
                                    {course.topics ? (
                                        <React.Fragment key={`course-route-${course}`}>
                                            <Route
                                                path={`${category.name}/${course.name}`}
                                                element={<CourseTopicsList course={course}/>}
                                            />
                                            {course.topics.map((topic) => (
                                                <Route
                                                    path={`${category.name}/${course.name}/${topic.name}`}
                                                    element={
                                                        <CourseRenderedPage
                                                            courseName={course.name}
                                                            categoryName={category.name}
                                                            course={topic}
                                                        />
                                                    }
                                                    key={`topic-route-${topic}`}
                                                />
                                            ))}
                                        </React.Fragment>
                                    ) : (
                                        <Route
                                            path={`${category.name}/${course.name}`}
                                            element={<CourseRenderedPage categoryName={category.name} course={course}/>}
                                            key={`course-route-${course}`}
                                        />
                                    )}
                                </React.Fragment>
                            )
                        })
                    )};
                </Routes>
                <FooterApp/>
            </HashRouter>
        );
    }
;

export default App;
