import 'reflect-metadata'
import express from 'express'
import { MikroORM } from '@mikro-orm/core'
import { __port } from './constants'
import microConfig from './mikro-orm.config'

import { Post } from './entities/Post'

const main = async () => {
	const orm = await MikroORM.init(microConfig)
	await orm.getMigrator().up() //run migrations first
  
	const post = orm.em.create(Post, { title: 'My name is Manan 🥳', updatedAt:new Date(), createdAt:new Date() }, {})
	await orm.em.persistAndFlush(post)

	const posts = await orm.em.find(Post, {})
	console.log(posts)

	const app = express()
	//Middleware

	app.listen(__port, () => {
		console.log(`Listening on port ${__port}`)
	})
}

main().catch((err) => console.error(err))
