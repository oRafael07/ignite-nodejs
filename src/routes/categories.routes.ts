import { Request, Response, Router } from 'express'
import { Category } from '../model/Category'
import { CategoriesRepository } from '../repositories/CategoriesRepository'

const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body

  const categoryAlreadyExists = categoriesRepository.findByName(name)

  if (categoryAlreadyExists) return res.status(400).json({ error: "Category already exists!" })

  const category = new Category()

  Object.assign(category, {
    name,
    description,
    created_at: new Date()
  })

  categoriesRepository.create(category)

  return res.status(201).send()
})

categoriesRoutes.get("/", (req: Request, res: Response) => {
  const all = categoriesRepository.list()

  return res.json(all)
})

export { categoriesRoutes }