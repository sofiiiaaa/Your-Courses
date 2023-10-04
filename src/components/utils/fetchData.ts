import {CourseCategory} from "../../App";


export const fetchData = async (url: string): Promise<CourseCategory[]> => {
    return await fetch(url).then(
        (response) => response.json(),
        (error) => console.log(error)
    );
}
