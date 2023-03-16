import "./Footer.css"

const Footer = () => {

    return (
        <div className='main-footer-container'>
            <div className="tech-and-about-container">
                <div className="first-column">
                    <h3 style={{ textDecoration: 'none', color: "rgb(30, 30, 30)" }}>Languages</h3>
                    <p><a href="https://www.javascript.com/" target="_blank" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Javascript</a></p>
                    <p><a href="https://www.python.org/" target="_blank" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Python</a></p>
                    <p><a href="https://html.com/" target="_blank" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>HTML</a></p>
                    <p><a href="https://www.w3.org/Style/CSS/Overview.en.html" target="_blank" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>CSS</a></p>
                </div>
                <div className="second-column">
                    <h3 style={{ textDecoration: 'none', color: "rgb(30, 30, 30)" }}>Backend</h3>
                    <p><a href="https://flask.palletsprojects.com/en/2.2.x/" target="_blank" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Flask</a></p>
                    <p><a href="https://www.sqlalchemy.org/" target="_blank" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>SqlAlchemy</a></p>
                    <p><a href="https://alembic.sqlalchemy.org/en/latest/" target="_blank" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Alembic</a></p>
                </div>
                <div className="third-column">
                    <h3 style={{ textDecoration: 'none', color: "rgb(30, 30, 30)" }}>Frontend</h3>
                    <p><a href="https://reactjs.org/" target="_blank" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>React</a></p>
                    <p><a href="https://redux.js.org/" target="_blank" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Redux</a></p>
                </div>
                <div className="fourth-column">
                    <h3 style={{ textDecoration: 'none', color: "rgb(30, 30, 30)" }}>Social</h3>
                    <p><a href="https://www.linkedin.com/in/sophie-main-154961108/" target="_blank" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Linkedin</a></p>
                    <p><a href="https://github.com/sophmain" target="_blank" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Github</a></p>
                </div>
            </div>
        </div >
    )
}

export default Footer;
