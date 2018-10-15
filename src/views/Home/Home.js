import React from "react";
import PropTypes from "prop-types";
import GridContainer from "./../../components/Grid/GridContainer";
import GridItem from "./../../components/Grid/GridItem";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import YouTube from 'react-youtube';
import contentImg from './../../assets/img/Content.jpg'
class Home extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }
    render() {
    const { classes} = this.props;
    const opts = {
        height: '390',
        width: '640',
        playerVars: { 
          autoplay: 0
        }
      };
      const video = [
        { name: "MailTicket", ID: "dZ4hK2_puNM" },
        { name: "LiveChat", ID: "7ohBYGLz9Zw" },
      ] 
        return (
        <div className={classes.root}>
             <GridContainer>
                 <GridItem xs={12} sm = {12} md={6}>
                    <h1 className={classes.h1}>
                    Trải nghiệm khách hàng tốt nhất được xây dựng với FiveDesk
                    </h1>
                    <p className={classes.p}>
                    Nền tảng tương tác và dịch vụ khách hàng mạnh mẽ và linh hoạt, 
                    và quy mô để đáp ứng nhu cầu của bất kỳ doanh nghiệp nào.
                    </p>
                 </GridItem>
                 <GridItem xs={12} sm = {12} md={6}>
                    <img className={classes.img} src={contentImg}/>
                 </GridItem>
                 <GridItem xs={12} sm={12} md={12}>
                    <h1 className={classes.h1_2}>
                        Kết nối khách hàng
                    </h1>
                 </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                <div className={classes.video}>
                <YouTube className={classes.videoy}
                videoId={video[0].ID}
                opts={opts}
                onReady={this._onReady}
                />
                </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.h1_3}>Mail Ticket</h1>
                <p className={classes.p}>
                Là một đại lý, trách nhiệm chính của bạn là giải quyết các yêu cầu hỗ trợ của khách 
                hàng. Để làm điều đó, bạn làm việc với Mail Ticket, có thể đến bằng nhiều cách khác nhau như 
                thông qua biểu mẫu yêu cầu, trực tiếp qua email, qua điện 
                thoại và trò chuyện văn bản và từ phương tiện truyền thông xã hội như Twitter và 
                Facebook. Các tùy chọn mà khách hàng của bạn có để yêu cầu hỗ trợ được gọi là Channel. 
                Chủ sở hữu tài khoản của bạn hoặc quản trị viên thiết lập Hỗ trợ FiveDesk cho bạn 
                sẽ xác định kênh nào được bao gồm.
                </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.h1_3}>Live Chat</h1>
                <p className={classes.p}>
                Live Chat tạo kết nối cá nhân với khách hàng đang tìm kiếm hỗ trợ. 
                Đó là một cách nhanh chóng và hiệu quả để cung cấp trợ giúp — 
                mà không làm gián đoạn trải nghiệm của họ.
                Live Chat cho phép các đại lý xử lý nhiều cuộc trò chuyện cùng một lúc, 
                do đó thời gian chờ giảm và khách hàng có trải nghiệm tốt hơn.
                </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <div className={classes.video}>
                <YouTube className={classes.videoy}
                videoId={video[1].ID}
                opts={opts}
                onReady={this._onReady}
                />
                </div>
                </GridItem>
             </GridContainer>
        </div>
        );
    }
}
const styles =  {
    root: {
        width: '95%', 
        marginLeft: 'auto', 
        marginRight: 'auto',
    },
    img: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },

    video:{
        marginTop: 25,
        display: 'flex',
        justifyContent:'center', 
        alignItems:'center',
        position:'relative',
	    height:450,
	    overflow:'hidden',
    },

    videoy: {
        position:'absolute',
	    top:0,
	    left:0,
	    width:'100%',
	    height:'100%',
    },

    h1: {
        fontFamily: 'roboto-medium',
        fontSize: 48,
        color: '#00bcd4',
    },
    p: {
        fontFamily: 'roboto-light',
        fontSize: 20,
        lineHeight: 1.7,
    },
    h1_2: {
        fontFamily: 'roboto-medium',
        color: '#016370',
        display: 'flex',
        justifyContent:'center', 
        alignItems:'center',
        fontSize: 50,
        margin: 60,
    },

    h1_3: {
        fontFamily: 'roboto-medium',
        color: '#00bcd4',
        fontSize: 35,
    },

};
export default withStyles(styles)(Home);
