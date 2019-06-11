
var superSchool = {school:'学军中学'}
var CreateStu = function () {
    this.school = '实验中学'
}

CreateStu.prototype = {
    saySchool: function () {
        console.log('I am the student of', this.school)
    }
}

var stu1 = new CreateStu();
stu1.saySchool();

var stu1SaySchool = stu1.saySchool.bind(superSchool);
stu1SaySchool();

// --------------------------------------------

var stu2 = {
    name:'xiaoli',
    age:18,
    getSchool: function () { return this.school }
}

var getSchool = stu2.getSchool;
var aa = getSchool.bind({school:'学军中学'});
console.log(getSchool())
console.log(aa())

// ------------------------------------------------

var package = {
    owner: 'john',
    have: function () {
        console.log( this.owner + '`s package have ' + [...arguments])
    }
}

var haveWhat = package.have('apple','orange')
var haveWine = package.have.bind({owner:'lucy'}, 'champagne', 'whisky', 'vodka')
haveWine();