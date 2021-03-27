import { useAuth } from 'context/context-data/auth-context'
import React, { FormEvent } from 'react'


export const RegisterScreen = () => {
  const {user, register} = useAuth()

  // Ts: duck typing : API 编程
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const username = (event.currentTarget.elements[0] as HTMLFormElement).value
      const password = (event.currentTarget.elements[1] as HTMLFormElement).value
      
      register({username, password})
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={'username'}/>
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={'password'}/>
      </div>
      <button type={'submit'}>注册</button>
    </form>
  )
}