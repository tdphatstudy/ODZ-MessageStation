import '../../assets/css/component/toast/toast.css';

const Toast = ({title, content, callback}) => {
    const handleClick = () => {
        
        callback({success: null, message: null});
      };

    
    if (title == "Success!") {
        return (
            
            <div className="toast-success-wrapper-register-page">
            <div className="icon-toast-register-page"></div>
            <div className="content-toast-register-page">
                <div className="title-toast-register-page">{title}</div>
                <div className="message-toast-register-page">{content}</div>
            </div>
            <div className="close-toast-register-page" onClick={handleClick}></div>
        </div>
        )
    } else if (title == 'Fail!') {
        return (
            <div className="toast-fail-wrapper-register-page">
                    <div className="icon-toast-register-page"></div>
                    <div className="content-toast-register-page">
                        <div className="title-toast-register-page">{title}</div>
                        <div className="message-toast-register-page">{content}</div>
                    </div>
                    <div className="close-toast-register-page" onClick={handleClick}></div>
                </div>
        );
    }
} 

export default Toast;