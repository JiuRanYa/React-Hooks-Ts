import React from 'react'
import { useEffect, useState } from "react"
import { SearchPannel } from './search-pannel'
import { List } from './list'
import qs from 'qs'
import { cleanObject, useMount, useDebounce } from 'utils'
import { useHttp } from 'utils/http'

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
	
	const client = useHttp()

	// 依赖为param，当param变化时调用
	useEffect(() => {
		client('projects', {data: cleanObject(debounceParam)}).then(setList)
	}, [debounceParam])

  useMount(() => {
		client('users').then(setUsers)
	})

  return <div>
    <SearchPannel param={param} setParam={setParam} users={users}/>
    <List list={list} users={users}/>
  </div>
}