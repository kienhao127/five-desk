import React from "react";
import PropTypes from "prop-types";
import {Link } from "react-router-dom";
// @material-ui/core components
// core components
import "./../../assets/css/Footer-with-button-logo.css";
import "./../../assets/css/bootstrap.min.css";
function Footer({ ...props }) {
  const { classes, logo, logoText } = props;
  return (
    <footer id="myFooter">
        <div class="container">
            <div class="row">
                <div class="col-sm-3">
                    <h2 class="logo"><a href="#"> FiveDesk </a></h2>
                </div>
                <div class="col-sm-2">
                    <h5>Bắt đầu</h5>
                    <ul>
                        <li><a href="#">Trang chủ</a></li>
                        <li><a href="/Login">Đăng nhập</a></li>
                    </ul>
                </div>
                <div class="col-sm-2">
                    <h5>Về chúng tôi</h5>
                    <ul>
                        <li><a href="#">Thông tin công ty</a></li>
                        <li><a href="#">Đánh giá</a></li>
                    </ul>
                </div>
                <div class="col-sm-2">
                    <h5>Hộ trợ</h5>
                    <ul>
                        <li><a href="/Home">FAQ</a></li>
                        <li><a href="/Home">Blog</a></li>
                        <li><a href="/Home">Forums</a></li>
                    </ul>
                </div>
                <div class="col-sm-3">
                    <div class="social-networks">
                        <a href="/Home" class="twitter"><i class="fa fa-twitter"></i></a>
                        <a href="/Home" class="facebook"><i class="fa fa-facebook"></i></a>
                        <a href="/Home" class="google"><i class="fa fa-google-plus"></i></a>
                    </div>
                    <button type="button" class="btn btn-default">Liên hệ</button>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <p>&copy; {(new Date().getFullYear())} Nhóm 10 All Rights Reserved</p>
        </div>
    </footer>
    
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (Footer);
