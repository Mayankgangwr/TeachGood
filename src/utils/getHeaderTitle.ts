const getHeaderTitle = (pathname: string) => {
    switch (pathname) {
        case '/':
            return 'Dashboard';
        case '/assignments':
            return 'Assignments';
        case '/subjects':
            return 'Subjects';
        case '/courses':
            return 'Courses';
        case '/teachers':
            return 'Teachers';
        case '/batches':
            return 'Batches';
        case '/students':
            return 'Students';            
        case '/login':
            return 'Login';
        case '/signup':
            return 'Sign Up';
        case '/foods':
            return 'Foods';
        case '/food-category':
            return 'Food Categories';
        default:
            return 'Dashboard'; // Fallback title
    }


};

export default getHeaderTitle;