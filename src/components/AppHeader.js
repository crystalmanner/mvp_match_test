import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
} from '@coreui/react'
import { AppBreadcrumb } from './index'
import LogoImg from 'src/assets/brand/logo.svg'
import cilMenu from 'src/assets/icons/expand_icon.png'
import userIcon from 'src/assets/icons/user_icon.png'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <img height={27} src={cilMenu} alt="menu icon" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <img className="sidebar-brand-full" height={48} src={LogoImg} alt="logo" />
        </CHeaderBrand>
        <CHeaderNav className="ms-3 user-icon">
          <img height={43} src={userIcon} alt="user icon" />
          John Doe
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
