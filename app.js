var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");
	mongoose.connect("mongodb://localhost/mongodb");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var gallerySchema = new mongoose.Schema({
	nama: String,
	img: String,
	description: String,
});

var gallery = mongoose.model("gallery", gallerySchema);

// gallery.create({ 
// 	nama: "mountain", img: "http://www.photosforclass.com/download/4812576807" 
// }, function(err, ok){
// 	if (err) {
// 		console.log("something has wrong!");
// 		console.log(err);
// 	}else{
// 		console.log(ok);
// 	}
// });



// var data = [
// 		{nama: "mountain", img: "http://www.photosforclass.com/download/4812576807"},
// 		{nama: "beach", img: "http://www.photosforclass.com/download/4835814837"},
// 		{nama: "camping", img: "http://www.photosforclass.com/download/7121863467"},
// 		{nama: "beauty", img: "http://www.photosforclass.com/download/4368764673"},
// 		{nama: "great", img: "http://www.photosforclass.com/download/7121865553"},
// 		{nama: "splash", img: "http://www.photosforclass.com/download/14435096036"},
// 	];

app.get("/", function(req, res){
	res.render("home");
})

app.get("/gallery", function(req, res){

	gallery.find({}, function(err, data){
		if (err) {
			console.log("error when showing the data");
			console.log(err);
		}else{
			console.log("success when showing the data");
			res.render("gallery", {data : data});
		}
	});
});

app.get("/gallery/:id", function(req, res){
	var id = req.params.id;

	gallery.findById(id, function(err, data){
		if (err) {
			console.log("error when showing the data by id");
			console.log(err);
		}else{
			console.log("success when showing the data by id");
			console.log(data);
			res.render("gallery_info", {data : data});
		}
	});
});

app.get("/gallery/new", function(req, res){
	res.render("gallery_add");
});

app.post("/gallery", function(req, res){
	var name = req.body.name;
	var img = req.body.img;
	var description = req.body.description;
	// var dataPush = {nama: name, img: img};

	gallery.create({
		nama: name,
		img: img,
		description: description,
	}, function(err, success){
		if (err) {
			console.log("error when submit new data");
			console.log(err);
		}else{
			console.log("success when submit new data");
			res.redirect("/gallery");
		}
	});

	// data.push(dataPush);

});


app.listen(3000, function(){
	console.log("server has been connected!");
});