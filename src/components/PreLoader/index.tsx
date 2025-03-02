import TextPressure from "../TextPressure/TextPressure";
import styles from "./preloader.module.scss";

export default function PreLoader() {
  const generateMessage = () => {
    const messages = [
      "Welcome...",
      "Just A Second...",
      "In progress...",
      "Loading...",
      "It's Coming...",
      "One Moment...",
      "Almost There...",
      "Don't leave.."
    ];
    const randomNum = Math.floor(Math.random() * messages.length);
    return messages[randomNum];
  };

  return (
    <div className={styles.preloader_overlay}>
      <div className={styles.preloader_container}>
        <div className={styles.preloader_spinner}></div>
        <TextPressure
          text={generateMessage()}
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={36}
        />
      </div>
    </div>
  );
}