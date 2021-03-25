import React from 'react'
import { useEffect, useState } from "react"
import { SearchPannel } from './search-pannel'
import { List } from './list'
import qs from 'qs'
import { cleanObject, useMount, useDebounce } from 'utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
	// 参数
	const [param, setParam] = useState({
		name: '',
		personId: '',
	})
	// select框用户
	const [users, setUsers] = useState([])
  // 列表页面
	const [list, setList] = useState([])
  // set debounce: 200ms
  const debounceParam = useDebounce(param, 200)

	// 依赖为param，当param变化时调用
	useEffect(() => {
		fetch(`${apiUrl}/projects/?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
			// fetch中ok代表请求成功
			if (response.ok) {
				setList(await response.json())
			}
		})
	}, [debounceParam])

  useMount(() => {
		fetch(`${apiUrl}/users`).then(async response => {
			if (response.ok) {
				setUsers(await response.json())
			}
		})
	})

  return <div>
    <SearchPannel param={param} setParam={setParam} users={users}/>
    <List list={list} users={users}/>
  </div>
}