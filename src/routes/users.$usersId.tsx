import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useSuspenseQuery } from '@tanstack/react-query'
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
  // loader: async () => {
  //   const data = await myServerFn({
  //     data: {
  //       randomText: 'Ram bahadur'
  //     }
  //   })
  //   return data
  // }
})

function RouteComponent() {
  const {usersId} = Route.useParams()
  const data = Route.useLoaderData()
  const {data: useLoaderData} = useSuspenseQuery({
    queryKey: ['user',usersId],
    queryFn: () => myServerFn({
      data: {
        randomText: 'hellNo'
      }
    })
  })
  return <div>Hello {usersId} - {useLoaderData.message}!</div>
}
