function adminStatsController($scope, studentService, skillService, $rootScope, $http, $q) {

    //Init variable
    var student = [];
    var recruiter = [];
    var skills = [];
    var studentSkill = [];
    $scope.students = student;
    $scope.recruiters = recruiter;
    $scope.mainSkills = skills;
    $scope.studentSkills = studentSkill;

    //Load datas for graph
    function loadUsers() {
        //Load and sort users
        studentService.getAllUsers().then(function (res) {
            $scope.users = res.data;
            console.log(res.data);
            res.data.forEach(function (data) {
                if (data._type === 'Student')
                    student.push(data);
                else if (data._type === 'Recruiter')
                    recruiter.push(data);
            })

            //Load old students
            studentService.getAlumnis().then(function (res) {
                $scope.alumnis = res.data;

                //Load skills
                skillService.get().then(function (res) {
                    res.data.forEach(function (skill) {
                        if (skill.language === true)
                            skills.push(skill);
                    })
                    var data = {};
                    data.ids = [];
                    data.skills = skills;
                    skills.forEach(function (skill) {
                        data.ids.push(skill._id);
                    })
                    studentService.getStatLang(data).then(function (res) {
                        studentSkill.push(res.data);
                        console.log(res.data);

                        /*******  GRAPHS 3 *******/
                        console.log(res.data)
                        var total = 0;
                        res.data.forEach(function (lang) {
                            total += lang.nb;
                        })

                        var data3 = [];
                        res.data.forEach(function (lang) {
                            var graph = {};
                            graph.value = Math.round((lang.nb / total) * 100);
                            graph.label = lang.title;
                            data3.push(graph);
                        })

                        var opts = {
                            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> %",
                            onAnimationComplete: function () {
                                this.showTooltip(this.segments, true);

                            },
                            tooltipEvents: [],
                            showTooltips: true
                        };

                        //Variables for graph
                        var myDoughnutChart = new Chart(document.getElementById("lang").getContext("2d")).Doughnut(data3, opts);
                    })
                })

                /*******  GRAPHS 1 *******/
                var data = [
                    {
                        value: Math.round((recruiter.length / $scope.users.length) * 100),
                        color: "#483d8b",
                        highlight: "#675DA5",
                        label: "Recruteurs"
    },
                    {
                        value: Math.round((student.length / $scope.users.length) * 100),
                        color: "#08a23c",
                        highlight: "#26B556",
                        label: "Elèves"
    }
];
                var opts = {
                    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> %",
                    onAnimationComplete: function () {
                        this.showTooltip(this.segments, true);

                    },
                    tooltipEvents: [],
                    showTooltips: true
                };

                //Variables for graph
                var ctx = document.getElementById("stuRec").getContext("2d");
                var myDoughnutChart = new Chart(ctx).Doughnut(data, opts);

                /*******  GRAPHS 2 *******/
                $scope.studentFor = (student.length - $scope.alumnis.length);
                var data2 = [
                    {
                        value: Math.round(($scope.studentFor / student.length) * 100),
                        color: "#08a23c",
                        highlight: "#675DA5",
                        label: "En formation"
    },
                    {
                        value: Math.round(($scope.alumnis.length / student.length) * 100),
                        color: "#daa520",
                        highlight: "#26B556",
                        label: "Alumnis"
    }
];

                //Variables for graph
                var ctx2 = document.getElementById("stuAlu").getContext("2d");
                var myDoughnutChart = new Chart(ctx2).Doughnut(data2, opts);

                /*******  GRAPHS 4 *******/
                $scope.small = [];
                $scope.medium = [];
                $scope.high = [];
                $scope.big = [];
                $scope.ex = [];
                recruiter.forEach(function (recrut) {
                    if (recrut.size === "de 1 a 9 salariés")
                        $scope.small.push(recrut);
                    else if (recrut.size === "de 10 a 49 salariés")
                        $scope.medium.push(recrut);
                    else if (recrut.size === "de 50 a 499 salariés")
                        $scope.high.push(recrut);
                    else if (recrut.size === "de 500 a 999 salariés")
                        $scope.big.push(recrut);
                    else
                        $scope.ex.push(recrut)
                })

                var data4 = [
                    {
                        value: Math.round(($scope.small.length / recruiter.length) * 100),
                        color: "#08a23c",
                        highlight: "#675DA5",
                        label: "TP"
                    }, {
                        value: Math.round(($scope.medium.length / recruiter.length) * 100),
                        color: "yellow",
                        highlight: "#26B556",
                        label: "P"
                      }, {
                        value: Math.round(($scope.high.length / recruiter.length) * 100),
                        color: "#FDB45C",
                        highlight: "#675DA5",
                        label: "M"
                      }, {
                        value: Math.round(($scope.big.length / recruiter.length) * 100),
                        color: "red",
                        highlight: "#675DA5",
                        label: "G"
                      }, {
                        value: Math.round(($scope.ex.length / recruiter.length) * 100),
                        color: "#675DA5",
                        highlight: "#675DA5",
                        label: "TG"
                      }
                        ];

                //Variables for graph
                var myPieChart = new Chart(document.getElementById("rectrSize").getContext("2d")).Pie(data4, opts);

                /*******  GRAPHS 4 *******/
                $scope.a = [];
                $scope.pdll = [];
                $scope.idf = [];
                $scope.cvdl = [];
                recruiter.forEach(function (recrut) {
                    if (recrut.region === "Autre")
                        $scope.a.push(recrut);
                    else if (recrut.region === "Pays-De-la-Loire")
                        $scope.pdll.push(recrut);
                    else if (recrut.region === "Île-de-France")
                        $scope.idf.push(recrut);
                    else if (recrut.region === "Centre-Val de Loire")
                        $scope.cvdl.push(recrut);
                })

                var data5 = [
                    {
                        value: Math.round(($scope.a.length / recruiter.length) * 100),
                        color: "#483d8b",
                        highlight: "#675DA5",
                        label: "Autres"
                    }, {
                        value: Math.round(($scope.idf.length / recruiter.length) * 100),
                        color: "#08a23c",
                        highlight: "#26B556",
                        label: "Paris"
                      }, {
                        value: Math.round(($scope.pdll.length / recruiter.length) * 100),
                        color: "brown",
                        highlight: "#675DA5",
                        label: "Loire"
                      }, {
                        value: Math.round(($scope.cvdl.length / recruiter.length) * 100),
                        color: "red",
                        highlight: "#675DA5",
                        label: "Centre"
                    }];
                //Variables for graph
                var myPieChart = new Chart(document.getElementById("rectrArea").getContext("2d")).Pie(data5, opts);
            });
        })
    }
    loadUsers();

}