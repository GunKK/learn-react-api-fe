import { Container, Modal, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import authApi from '../../api/authApi';
import { login } from '../../redux/actions/auth';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import styles from './Auth.module.css';
import { toast } from "react-toastify";

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      navigate({ pathname: '/' })
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await authApi.login({email, password})
      setLoading(false)
      console.log(res);
      const { accessToken, user } = res
      localStorage.setItem('accessToken', accessToken)

      const { id, name, role } = user // Cannot access 'email' before initialization
      const avatar = 'https://gravatar.com/avatar/d36a92237c75c5337c17b60d90686bf9?size=200';
      toast.success('login success', { autoClose: 2000 });
      dispatch(login({ email, fullName: name, avatar, userId: id , role }))
      navigate({ pathname: '/' })
      
    } catch (error) {
      setLoading(false)
      console.log(error)
      console.log(error.response.data.error)
      toast.error(error.response.data.error, { autoClose: 2000 })
    }
  }
  
  return (
    <div className="main">
      <div className={styles.loginPage}>
        <Container>
          <div className="auth-wrapper">
            <h2 className="title text-center">ĐĂNG NHẬP</h2>
            <form className="form-login" onSubmit={handleLogin}>
              <div className={`form-group ${styles.formGroup}`}>
                <input required type="text" name="email" className="form-control" placeholder="Email..."
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={`form-group ${styles.formGroup}`}>
                <input required type="password" name="password" className="form-control" autoComplete="on" placeholder="Mật khẩu..." 
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link className={styles.forgotPassword} to="/quen-mat-khau">Quên mật khẩu?</Link>
              <button className={`bookstore-btn ${styles.submitBtn}`} disabled={loading}>{loading ? "Đăng nhập..." : "Đăng nhập"}</button>
            </form>
            <p style={{textAlign: 'center'}}>
              Bạn chưa có tài khoản? <Link to="/dang-ki" style={{color: '#0074da'}}>Đăng ký tại đây</Link>
            </p>
            <p style={{color: '#ccc', textAlign: 'center'}}>HOẶC</p>
          
            <div className="d-flex justify-content-between">
              <Button variant="outline-danger" className={styles.boxLoginThirdParty}>
                <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" alt="" />
                <span className="bookstore-btn">Google</span>
              </Button>

              <Button variant="outline-info" className={styles.boxLoginThirdParty}>
                <img src="https://cdn.pixabay.com/photo/2015/05/17/10/51/facebook-770688_1280.png" alt="" />
                <span className="bookstore-btn">Facebook</span>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Login;
