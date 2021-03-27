import React from 'react'
import { User } from 'screens/project-list/search-pannel'
import { Table } from 'antd'
import { spawn } from 'node:child_process'

interface Project {
	id: string,
	name: string,
	personId: string,
	organization: string,
	created: number
}

interface ListProps {
	list: Project[],
	users: User[]
}

export const List = ({list, users}: ListProps) => {
	return <Table pagination={false} columns={[{
		title: '名称',
		dataIndex: 'name',
		sorter: (a, b) => a.name.localeCompare(b.name)
	}, {
		title: '负责人',
		render(value, project){
			return <span>
				{users.find(user => user.id === project.personId)?.name || '未知'}
			</span>
		}
	}]} dataSource={list}>
		<thead>
			<tr>
				<th>名称</th>
				<th>负责人</th>
			</tr>
		</thead>
		<tbody>
			{
				list.map(project => 
				<tr key={project.id}>
					<td>{project.name}</td>
					<td></td>
				</tr>)
			}
		</tbody>
	</Table>
}