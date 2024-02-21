import { Container, Row, Col, Button } from 'react-bootstrap';
import bookApi from '../../api/bookApi';
import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import videoHomePage from '../../assets/hero.mp4';

const Home = () => {
  return (
    <div className="main">
      <Container className={styles.homeContainer}>
        <Row className={styles.homeWrap}>
          <Col xl={6} md={12} sm={12} className={styles.homeVideo}>
            <video autoPlay muted loop className={styles.homeVideoSrc}>
              <source src={videoHomePage} type="video/mp4" />
            </video>
          </Col>
          <Col xl={6} md={12} sm={12} className={styles.homepageSlogan}>
            <h1>
              Make forms
              <br />
              worth filling out
            </h1>
            <p>
              <span>Get more data—like signups, feedback, and anything else—with forms designed to be</span>
            </p>
            <div className="homepage-slogan-btn">
              <Button variant="dark">
                Get started—it's free
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
