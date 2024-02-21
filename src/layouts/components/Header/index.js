import { memo } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


import { Container } from 'react-bootstrap';
import { BsPerson } from "react-icons/bs";

import NavBar, { NavBarMobile } from "../NavBar";

import authApi from "../../../api/authApi";
import { logout } from '../../../redux/actions/auth';
import { destroy } from '../../../redux/actions/cart';

import styles from './Header.module.css';

function Header() {

  console.log('header Render')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.auth)


  const handleLogout = async () => {
    const resultLogout = await authApi.logout()
    console.log(resultLogout)
    dispatch(logout())
    dispatch(destroy())
    const token = localStorage.getItem('accessToken')
    if (token) {
      localStorage.removeItem('accessToken')
    }
    navigate({ pathname: '/' })
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerCenter}>
          <Container>
            <div className={styles.headerRow}>
              <NavBarMobile />
              <Link to='/' ><h1 className={`${styles.bookstoreHighlight} me-5`}>Study 4</h1></Link>
              <NavBar />

              <div className={`${styles.headerCenterRight} d-flex`}>
                <div className={styles.headerIcon}>
                  {
                    currentUser.email && currentUser.fullName ? 
                    <div className={styles.account}>
                      <img className={styles.avatar} src={`https://gravatar.com/avatar/d36a92237c75c5337c17b60d90686bf9?size=200`} alt="" />
                      <p>{currentUser.fullName}</p>
                      <div className={styles.accountPopup}>
                          {currentUser.role === 4 && (
                            <>
                              <div className={styles.item}><Link className={styles.popupLink} to="/tai-khoan">Tài khoản</Link></div>
                            </>
                          )}
                          {currentUser.role < 4 && (
                            <>
                              <div className={styles.item}><Link className={styles.popupLink} to="/admin">Quản lý BookStore</Link></div>
                            </>
                          )}
                          <div className={styles.item}><p className={styles.popupLink} onClick={handleLogout} to="">Đăng xuất</p></div>
                      </div>
                    </div>
                    : <Link to="/dang-nhap"><BsPerson /><p>Tài khoản</p></Link>
                  }
                </div>
              </div>

            </div>
          </Container>

      </div>
    </header>
  );
}

export default memo(Header);
