
const myLearningData = [
    {
        _id: "687f8f2419cdc51950277627",
        schedule: "2025-07-20T10:00:00.000Z",
        maxCapacity: 30,
        isFull: false,
        status: true,
        organization: {
            _id: "6842e2d92b54d26c5665e0f2",
            name: "John Doe",
            email: "john.doe@example.com",
            status: true,
        },
        course: {
            _id: "687f8ed919cdc51950277623",
            name: "Introduction to Java",
            description:
                "A beginner-friendly course to learn Python programming from scratch.",
            category: "Programming",
            level: "Beginner",
            duration: "6 weeks",
            imageUrl: "https://example.com/images/python-course.jpg",
            fee: 2999,
            status: true,
            isDelete: false,
        },
        branch: {
            _id: "687f8e9319cdc5195027761d",
            name: "Central Learning Hub 1",
            location: "Downtown, New York",
            contactEmail: "central@learninghub.com",
            phoneNumber: "+1555987654",
            timeZone: "America/New_York",
            isMainBranch: true,
            holidays: ["2025-12-25", "2025-01-01", "2025-11-28"],
            weeklyOff: ["Saturday", "Sunday"],
        },
        teacher: [
            {
                _id: "687f8df219cdc51950277613",
                name: "Teacher One",
                email: "teacher1@example.com",
                qualification: "Master of Science in Mathematics",
                specialization: ["Algebra", "Calculus"],
                experience: "5 years teaching at high school level",
                certifications: [
                    "Teaching Excellence Award",
                    "Certified Math Instructor",
                ],
                joinedAt: "2020-08-15T00:00:00.000Z",
            },
        ],
    },
];


const MyLearningPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">My Learning</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-4xl mx-auto">
                {myLearningData.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
                    >
                        <div className="p-6 space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold text-blue-700">
                                    {item.course.name}
                                </h2>
                                <p className="text-gray-600">{item.course.description}</p>
                                <div className="text-sm text-gray-500 mt-1">
                                    <span className="inline-block bg-gray-200 px-2 py-0.5 rounded-full mr-2">
                                        {item.course.category}
                                    </span>
                                    <span className="inline-block bg-gray-200 px-2 py-0.5 rounded-full">
                                        Level: {item.course.level}
                                    </span>
                                </div>
                            </div>
                           

                            <div className="flex flex-col gap-1">
                                <p>
                                    <span className="font-semibold">Schedule:</span>{" "}
                                    {new Date(item.schedule).toLocaleString()}
                                </p>
                                <p>
                                    <span className="font-semibold">Duration:</span> {item.course.duration}
                                </p>
                                <p>
                                    <span className="font-semibold">Fee:</span> ₹{item.course.fee}
                                </p>
                                <p>
                                    <span className="font-semibold">Max Capacity:</span> {item.maxCapacity}
                                </p>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Branch Information</h3>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Name:</span> {item.branch.name}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Location:</span> {item.branch.location}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Contact:</span> {item.branch.contactEmail} | {item.branch.phoneNumber}
                                </p>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Instructor</h3>
                                {item.teacher.map((t) => (
                                    <div key={t._id} className="border rounded-lg p-4 bg-gray-50">
                                        <p>
                                            <span className="font-semibold">Name:</span> {t.name}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Email:</span> {t.email}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Qualification:</span> {t.qualification}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Specialization:</span> {t.specialization.join(", ")}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Experience:</span> {t.experience}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Certifications:</span> {t.certifications.join(", ")}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Joined At:</span> {new Date(t.joinedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default MyLearningPage;
