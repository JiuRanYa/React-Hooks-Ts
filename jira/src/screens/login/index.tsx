import React, { FormEvent } from 'react'
import { useEffect, useState } from "react"

const apiUrl = process.env.REACT_APP_API_URL

export const LoginScren = () => {
  // login function
  const login = (param: {username: string, password: string}) => {
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(param)
    }).then(
      async response => {
      // fetch中ok代表请求成功
      if (response.ok) {
      }
    })
  }
  // Ts: duck typing : API 编程
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      console.log(event.currentTarget.elements)

      const username = (event.currentTarget.elements[0] as HTMLFormElement).value
      const password = (event.currentTarget.elements[1] as HTMLFormElement).value

      login({username, password})
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
      <button type={'submit'}>登录</button>
    </form>
  )
}