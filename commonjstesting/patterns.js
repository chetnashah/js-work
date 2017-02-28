

var person = (
    function(){
        var age = 25;
        function getAge() {
            return age;
        }
        function growOlder() {
            age++;
        }
        return {
            name: "nick",
            getAge: getAge,
            growOlder: growOlder
        };
    }()
);
