import "../styles/layout.css";

export default function Footer() {

  return (
    <footer className="footer">
      <p className="footer-text">
        Made by{" "}
        <a href={`${process.env.REACT_APP_PERSONAL_WEBSITE}`} style={{ textDecoration: 'none', color: 'var(--primary-green)' }}>
          Kobe Zheng
        </a>
          </p>
    </footer>);
}