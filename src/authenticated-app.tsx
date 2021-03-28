import React from 'react'
import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/context-data/auth-context'
import styled from '@emotion/styled'
import { Row } from 'components/lib'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()

  return <Container>
    <Header between={true}>
      <HeaderLeft gap={true}>
        <h2>logo</h2>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <button onClick={logout}>注销</button>
      </HeaderRight>
    </Header>
    <Main>
      <ProjectListScreen />
    </Main>
  </Container>
}


const HeaderItem = styled.h3`
  margin-right: 3ren;
`
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`
const Header = styled(Row)`
`

const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div``

const Main = styled.main``

const PageHeader = styled.header`
  height: 6rem;
  background-color:gray;
`
