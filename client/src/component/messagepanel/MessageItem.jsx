import "../../assets/css/component/message-panel/messageitem.css"; 
import DateHelper from '../../helper/DateHelper';

const MessageItem = ({pronoun, name, content, time}) => {
    if (pronoun === "me") {
        return (
            <div className="message-item-me-pronoun-wrapper">
                <div className="message-item-me-pronoun-name">{name}</div>
                <div className="message-item-me-pronoun-content">{content}</div>
                <div className="message-item-me-pronoun-time">{DateHelper.formatTime(time)}</div>
            </div>
        );
    } else if (pronoun ==="other") {
        return (
            <div className="message-item-other-pronoun-wrapper">
                <div className="message-item-other-pronoun-name">{name}</div>
                <div className="message-item-other-pronoun-content">{content}</div>
                <div className="message-item-other-pronoun-time">{DateHelper.formatTime(time)}</div>
            </div>
            );
    } else {
        return (
            <div className="message-item-error-wrapper">
                <div className="message-item-error-icon"></div>
                <div className="message-item-error-text">Có gì đó không đúng! Chúng tôi sẽ cố gắng khác phục nhanh chóng.</div>
                
            </div>);
    }
}
export default MessageItem