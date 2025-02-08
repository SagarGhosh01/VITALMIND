let questions = [
    {
        numb: 1,
        question: "How often do you feel overwhelmed with responsibilities?",
        // answer: "C. Hyper Text Markup Language",
        options: ["Never", "Sometimes", "Often", "Very Often"]
    },
    {
        numb: 2,
        question: "Do you have trouble sleeping due to worry or stress?",
        // answer: "A. Cascading Style Sheet",
        options: ["Never", "Sometimes", "Often", "Very Often"]
    },
    {
        numb: 3,
        question: "How frequently do you experience sudden feelings of panic or fear?",
        // answer: "A. Hypertext Preprocessor",
        options: ["Never", "Sometimes", "Often", "Very Often"]
    },
    {
        numb: 4,
        question: "Do you find it difficult to concentrate on daily tasks?",
        // answer: "D. Structured Query Language",
        options: ["Never", "Sometimes", "Often", "Very Often"]
    },
    {
        numb: 5,
        question: "How often do you feel uninterested or unmotivated in activities you used to enjoy?",
        // answer: "D. Extensible Markup Language",
        options: ["Never", "Sometimes", "Often", "Very Often"]
    },
];
// let questions = [];

// Fetch questions from Flask backend
fetch("http://localhost:5000/get_questions")
    .then(response => response.json())
    .then(data => {
        questions = data;
    })
    .catch(error => console.error("Error fetching questions:", error));
