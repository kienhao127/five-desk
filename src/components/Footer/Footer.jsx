import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "./../../components/Grid/GridContainer";
import GridItem from "./../../components/Grid/GridItem";
import Button from '@material-ui/core/Button';
// @material-ui/core components
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle.jsx";
function Footer({ ...props }) {
  const { classes} = props;
  return (
    <footer className={classes.footer}>
    <div className={classes.container}>
            <GridContainer>
            <GridItem xs={12} sm={12} md={3} >
            <h2><a className={classes.logo} href="/Home"> FiveDesk </a></h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
            <h5 className={classes.h5}>Bắt đầu</h5>
                    <ul className={classes.ul}>
                        <li><a className={classes.a} href="/Home">Trang chủ</a></li>
                        <li><a className={classes.a}  href="/Login">Đăng nhập</a></li>
                    </ul>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
            <h5 className={classes.h5}>Về chúng tôi</h5>
                    <ul className={classes.ul}>
                        <li><a className={classes.a}  href="#">Thông tin công ty</a></li>
                        <li><a className={classes.a}  href="#">Đánh giá</a></li>
                    </ul>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
            <h5 className={classes.h5}>Hỗ trợ</h5>
                    <ul className={classes.ul}>
                        <li><a  className={classes.a} href="/Home">FAQ</a></li>
                        <li><a  className={classes.a} href="/Home">Blog</a></li>
                        <li><a  className={classes.a} href="/Home">Forums</a></li>
                    </ul>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
            <div className={classes.social_networks}>
                        <a className={classes.social_networks_twitter} href="/Home"><i class="fa fa-twitter"></i></a>
                        <a className={classes.social_networks_google} href="/Home"><i class="fa fa-facebook"></i></a>
                        <a className={classes.social_networks_facebook} href="/Home"><i class="fa fa-google-plus"></i></a>
            </div>
            <Button variant="contained" color="secondary" className={classes.Button}>
                    Liên hệ
            </Button>
            </GridItem>
            </GridContainer>
        <div className={classes.footerCopyright}>
            <p>&copy; {(new Date().getFullYear())} Nhóm 10 All Rights Reserved</p>
        </div>
    </div>
    </footer>
    
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
