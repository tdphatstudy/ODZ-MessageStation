import "../../../../assets/css/component/display-panel/home-panel/backgroundtemplate1.css";

const BackgroundTemplateOne = () => {
    return (
        <div className="background-template-1-wrapper">
            <div className="image-background-template-1"></div>
            <div className="info-background-template-1">
                <div className="hello-background-template-1">HELLO EVERYBODY, I AM</div>
                <div className="name-background-template-1">Trần Đại Phát</div>
                <div className="role-background-template-1">Fullstack Developer</div>
                <div className="review-background-template-1">Lập trình viên Fullstack học tại Đại học Sài Gòn. Với các kỹ thuật lập trình Nodejs, Lavarel, Java.</div>
                <div className="birth-date-background-template-1-wrapper">
                    <label className="birth-date-background-template-1-icon"></label>
                    <div className="birth-date-background-template-1">06/06/2001</div>
                </div>
                <div className="phone-background-template-1-wrapper">
                    <label className="phone-background-template-1-icon"></label>
                    <div className="phone-background-template-1">0942805461</div>
                </div>
                <div className="mail-background-template-1-wrapper">
                    <label className="mail-background-template-1-icon"></label>
                    <div className="mail-background-template-1">tdphat.study@gmail.com</div>
                </div>
                <div className="address-background-template-1-wrapper">
                    <label className="address-background-template-1-icon"></label>
                    <div className="address-background-template-1">320/12, CP, An giang</div>
                </div>
            </div>
        </div>
    );
}
export default BackgroundTemplateOne;