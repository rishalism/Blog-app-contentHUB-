import express from 'express'
import { Login, refreshAccesToken, Signup } from '../controllers/UserController'
import imageUpload from '../middlewares/ImageUpload'
import { CreatePost, DeletePost, GetallPost, UpdatePost } from '../controllers/Postcontroller'
import UserAuth from '../middlewares/AuthMidlleware'
const route = express()

route.post('/auth/signup', (req, res, next) => Signup(req, res, next))
route.post('/auth/login', (req, res, next) => Login(req, res, next))
route.post('/refreshtoken', (req, res, next) => refreshAccesToken(req, res, next))

route.get('/blog/get', UserAuth, (req, res, next) => GetallPost(req, res, next))
route.post('/blog/create', UserAuth, imageUpload, (req, res, next) => CreatePost(req, res, next))
route.put('/blog/update', UserAuth, imageUpload, (req, res, next) => UpdatePost(req, res, next))
route.delete('/blog/delete/:id', UserAuth, (req, res, next) => DeletePost(req, res, next))

export default route