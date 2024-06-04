export interface ICourseCard {
    title: string;
    imageurl?: string;
    description: string;
    instructor?: string;
    price: string;
    courseId?: string;
    _id?: string;
}

export interface ICourseCreate {
    message: string;
    courseId: string;
}
