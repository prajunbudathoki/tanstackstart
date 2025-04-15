import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'vinxi'

const myServerFn = createServerFn().validator(
  z.object({
    randomText: z.string()
  })
).handler(async(params) => {
  const name = params.data.randomText
  return {
    message: 'hello how are you'
  }
})

export const Route = createFileRoute('/users/$usersId')({
  component: RouteComponent,
  loader: async () => {
    const data = await myServerFn({
      data: {
        randomText: 'Ram bahadur'
      }
    })
    return data
  }
})

function RouteComponent() {
  const {usersId} = Route.useParams()
  const data = Route.useLoaderData()
  return <div>Hello {usersId} - {data.message}!</div>
}
