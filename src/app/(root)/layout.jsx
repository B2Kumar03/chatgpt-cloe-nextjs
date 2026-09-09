import React from 'react'
import {auth} from "@clerk/nextjs/server"
import { onBoard } from '../../../features/auth/actions/onboard'

const RootGroupLayout = async({children}) => {
    await auth.protect()
    await onBoard()
  return (
    <div>{children}</div>
  )
}

export default RootGroupLayout