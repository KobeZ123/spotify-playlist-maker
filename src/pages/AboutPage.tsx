import spotify_logo from "../assets/spotify-logo.png";
import github_icon from "../assets/github.png";

export default function AboutPage() {
  return (
    <div className="about-page-container">
      
        <img src={spotify_logo} alt="Spotify Logo" width={128} height={128} />
        <p className="about-page-p">
          The Spotify Playlist Maker is a web application that allows a
          user to view their music listening profile and automatically generate
          an interval playlist based on recommendations selected by the user.
        </p>
        <a
          href="https://github.com/KobeZ123/spotify-playlist-maker"
          className="link-to-github-btn no-decoration"
        >
          <img src={github_icon} alt="github" width={36} height={36} />
          <p>Link to GitHub</p>
        </a>
      
    </div>
  );
}
