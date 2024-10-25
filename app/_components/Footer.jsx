import React from 'react'
import { useUser } from '@clerk/nextjs'


export const Footer = () => {
  const { user } = useUser();
  return user &&(
    <div>Footer</div>
  )
}
