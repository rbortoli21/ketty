import React from 'react'
import { useLocation, Redirect, useHistory } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { useCurrentUser } from '@coko/client'

import { Login } from '../ui'
import { LOGIN } from '../graphql'

const LoginPage = () => {
  const { search } = useLocation()
  const { setCurrentUser } = useCurrentUser()
  const history = useHistory()

  const [loginMutation, { data, loading, error }] = useMutation(LOGIN)

  const redirectUrl = new URLSearchParams(search).get('next') || '/dashboard'

  const login = formData => {
    const mutationData = {
      variables: {
        input: formData,
      },
    }

    loginMutation(mutationData).catch(e => console.error(e))
  }

  const existingToken = localStorage.getItem('token')
  if (existingToken) return <Redirect to={redirectUrl} />

  let errorMessage = 'Something went wrong!'

  if (error?.message.includes('username or password'))
    errorMessage = 'Invalid credentials'

  if (data) {
    const token = data.ketidaLogin?.token

    setCurrentUser(data.ketidaLogin?.user)

    if (token) {
      localStorage.setItem('token', token)
      return <Redirect to={redirectUrl} />
    }

    if (data.ketidaLogin?.code === 100) {
      history.push('/unverified-user/')
    }
  }

  return (
    <Login
      errorMessage={errorMessage}
      hasError={!!error}
      loading={loading}
      onSubmit={login}
    />
  )
}

export default LoginPage
