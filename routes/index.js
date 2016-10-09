var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var projects = [
        {
            title: "iompar",
            description: "Transportation app for the Luas light-rail system with logic based on set theory.",
            url: "#"
        },
        {
            title: "Neurobranch",
            description: "Clinical trials platform developed on Android and web.",
            url: "#"
        },
        {
            title: "Drink Tracker",
            description: "Virtual breathalyser Android app based on the Widmark formula of alcohol decomposition.",
            url: "#"
        },
        {
            title: "Meat Timer",
            description: "Simple timer Android app for cooking meat with mathematical formulae.",
            url: "#"
        },
        {
            title: "Zoomba",
            description: "Freelance game implementing hierarchies, composition, inheritance and entities.",
            url: "#"
        },
        {
            title: "Facial Recognition",
            description: "Machine learning based greeter combining Alexa voice services, Tomcat, and Python scripts.",
            url: "#"
        }
    ];

    res.render('index', {
        projects: projects
    });
});

router.get('/project/:project', function (req, res) {
    var projectName = req.params.project;
    res.render('project', {
        title: projectName
    });
});

router.get('/language-experience', function (req, res) {
    var languages = [
        {
            language: "Java",
            description: "Most experienced and favourable language. Used extensively for Android apps, and is usually my go to language. Experience with Java EE, Java SE, Tomcat and applets.",
            url: "java"
        },
        {
            language: "Python",
            description: "Favourite language for rapid prototyping and scripting. Experience with machine learning and AI libraries.",
            url: "python"
        },
        {
            language: "C#",
            description: "Experience with Xamarin app development, Unity, and some general projects.",
            url: "c%23"
        },
        {
            language: "C++",
            description: "Graphics and computer vision projects in college, used for data structures, algorithms and some game programming in spare time.",
            url: "c%2B%2B"
        },
        {
            language: "C",
            description: "Low level programming and concurrency assignments.",
            url: "c"
        },
        {
            language: "Ruby",
            description: "Experience with server and online services.",
            url: "ruby"
        },
        {
            language: "JavaScript",
            description: "Used as part of web development and also server development with Node.js using MEAN stack.",
            url: "javascript"
        },
        {
            language: "HTML5 & CSS3",
            description: "Used frequently alongside libraries such as AngularJS, jQuery, and Handlebars.",
            url: "css"
        },
        {
            language: "Haskell",
            description: "Dabbled with to dive more into functional paradigm based languages.",
            url: "haskell"
        },
        {
            language: "Prolog",
            description: "Dabbled with the language of interest in mathematics and logic.",
            url: "prolog"
        },
        {
            language: "Assembly",
            description: "Used in microprocessor systems and computer architecture modules.",
            url: "assembly"
        },
        {
            language: "TeX",
            description: "Use frequently as type-language for document creation and publishing.",
            url: "tex"
        },
        {
            language: "Shell",
            description: "Used from time to time to automate and perform tasks on Unix.",
            url: "shell"
        }
    ];

    res.render('language-experience', {languages: languages});
});

router.get('/work-experience', function (req, res) {
    var jobs = [
        {
            employer: "GlassByte Ltd",
            location: "Ballsbridge, Dublin, Ireland",
            title: "CTO/Developer",
            period: "April 2015 - Present",
            url: "http://www.glassbyte.com",
            image: "/images/glassbyte.png"
        },
        {
            employer: "Accenture PLC",
            location: "Grand Canal Dock, Dublin, Ireland",
            title: "Machine Learning Analyst Intern",
            period: "June - September 2016",
            url: "http://www.accenture.com",
            image: "/images/accenture.png"
        },
        {
            employer: "Huawei Technologies Ltd",
            location: "Shenzhen, Guangdong, China",
            title: "Seeds for the Future Intern",
            period: "August 2015",
            url: "http://www.huawei.com",
            image: "/images/huawei.png"
        }
    ];

    res.render('work-experience', {jobs: jobs});
});

module.exports = router;
