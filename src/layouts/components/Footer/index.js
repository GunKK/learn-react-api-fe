import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { IoPaperPlane, IoLogoFacebook, IoLogoYoutube, IoLogoInstagram } from "react-icons/io5";

import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col xl={3} xs={12}>
            <div className={styles.footerGroup}>
              <Link to='/'><h1 className={`${styles.bookstoreHighlight} me-5`}>Study 4.0</h1></Link>
              <p>Bcons bee, hẻm 522, phường Bình An, TP Dĩ An, Bình Dương</p>
              <p>hau.nguyenbk8786@gmail.com</p>
            </div>
          </Col>
          <Col xl={6} xs={12}>
            <div className={styles.footerGroup}>
                <Row>
                  <Col xl={4} xs={6}>
                    <div className={styles.footerBoxLink}>
                        <p className={styles.title}>Khóa học online</p>
                        <Link to="/">IELTS General Reading</Link>
                        <Link to="/">IELTS General Writing</Link>
                        <Link to="/">IELTS Fundamentals</Link>
                        <Link to="/">IELTS Intensive Listening</Link>
                        <Link to="/">IELTS Intensive Reading</Link>
                    </div>
                  </Col>
                  <Col xl={4} xs={4} className={styles.cateList}>
                    <div className={styles.footerBoxLink}>
                        <p className={styles.title}>DANH MỤC</p>
                        <Link to="/">Trang chủ</Link>
                        <Link to="/">Giới thiệu</Link>
                        <Link to="/lien-he">Liên hệ</Link>
                        <Link to="/">Danh mục sản phẩm</Link>
                    </div>
                  </Col>
                  <Col xl={4} xs={6}>
                    <div className={styles.footerBoxLink}>
                        <p className={styles.title}>Tài nguyên</p>
                        <Link to="/">Thư viện đề thi</Link>
                        <Link to="/">Blog</Link>
                        <Link to="/">Kho tài liệu</Link>
                        <Link to="/">Nhóm học tập</Link>
                    </div>
                  </Col>
                </Row>
            </div>
          </Col>
          <Col xl={3} xs={12}>
            <div className={styles.footerGroup}>
              <p className={styles.title}>Study 4</p>
              <p>Đăng ký để nhận được được thông tin mới nhất từ chúng tôi.</p>
              <div className={`form-group ${styles.formGroup}`}>
                <input type="text" className="form-control" placeholder="Enter your email..." />
                <button className={`bookstore-btn ${styles.subscribeBtn}`}><IoPaperPlane /></button>
              </div>
              <div className={styles.boxSocial}>
                <button className={`bookstore-btn ${styles.bookstoreBtn}`}><IoLogoFacebook /></button>
                <button className={`bookstore-btn ${styles.bookstoreBtn}`}><IoLogoYoutube /></button>
                <button className={`bookstore-btn ${styles.bookstoreBtn}`}><IoLogoInstagram /></button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
