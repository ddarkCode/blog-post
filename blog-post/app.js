const express = require( 'express' )
const ejs = require( 'ejs' )
const _ = require( 'lodash' );
const mongoose = require('mongoose')


mongoose.connect( 'mongodb://localhost:27017/blogPostDB', {useNewUrlParser: true, useUnifiedTopology: true} );

const home =  'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.'

const about = 'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.'


const contact = 'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.'


const postSchema = new mongoose.Schema( {
	title: String,
	content: String
} )

const Post = mongoose.model( 'Post', postSchema );


const app = express();

app.set( 'view engine', 'ejs' );
app.use(express.static('public'))
app.use( express.urlencoded( { extended: true } ) );


app.get( '/', ( req, res ) => {
	Post.find( ( err, posts ) => {
		if ( !err ) {
			
			res.render( 'home', { home: 'Home', homeStartingContent: home, posts: posts } );
		} else {
			console.log( err );
		}
	} );
} );


app.get( '/about', ( req, res ) => {
	res.render('about', {about: 'About', aboutStartingContent: aboutStartingContent})
} )

app.get( '/contact', ( req, res ) => {
	res.render('contact', {contact: 'Contact', contactStartingContent: contactStartingContent})

} )

app.get( '/compose', ( req, res ) => {
	res.render('compose')
} )

app.get( '/posts/:id', ( req, res ) => {
	const requestedId =  req.params.id
	Post.findById(  requestedId, ( err, post ) => {
		if ( !err ) {
		res.render('post', {title: post.title, content: post.content})
		}
	})
	})


app.post('/', (req, res) => {
	const { blogTitle, blogContent } = req.body
	const post = new Post ({
		title: blogTitle,
		content: blogContent
	})
	post.save( ( err, docs ) => {
		console.log('Saved Docs:  ',  docs)
		if ( !err ) {
			res.redirect( '/' );
		}
	})
})

app.listen( 5000, () => console.log( 'Server running on port 5000' ) );



