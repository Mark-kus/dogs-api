import './Footer.module.css';
import linkedin from '../../assets/linkedin-logo.png';
import github from '../../assets/github.png';

export default function Footer() {
    return (
        <footer>
            <h4>Created by Mark-kus <br /> &copy;2023 All rights reserved</h4>
            <div>
                <a target='_blanck' href="https://www.linkedin.com/in/marco-tignanelli-34871a217/">
                    <img src={linkedin} alt="linkedin of author" />
                </a>
                <a target='_blanck' href="https://github.com/Mark-kus">
                    <img src={github} alt="github of author" />
                </a>
            </div>
        </footer>
    )
}