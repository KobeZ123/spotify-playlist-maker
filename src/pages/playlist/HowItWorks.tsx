export default function HowItWorks() {
  const handleNext = (event: any) => {
    event.preventDefault();
    console.log("next page");
  };

  return (
    <div className="playlist-page-container">
      <div className="playlist-page-content">
        <h1>Interval Playlist Maker</h1>
        <section>
          <h3>How it Works</h3>
          <p className="how-it-works-p">
            We will make the perfect playlist for you! <br /> All you have to do
            is select the artists that you like, the tracks you enjoy listening
            to, and the genres you love.
            <br />
            Give the playlist a name and select a duration.
            <br />
            Then, you are all set!
          </p>
          <p className="how-it-works-hint">
            Example: 30-minute "High-Intensity Jogging Playlist
          </p>
        </section>

        <button className="get-started-btn" onClick={handleNext}>
          Get Started
        </button>
      </div>
    </div>
  );
}
