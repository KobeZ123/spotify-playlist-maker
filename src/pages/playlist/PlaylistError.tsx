import sad_face from "../../assets/sad-outline.svg";

export default function PlaylistError() {
  const handleBack = (event: any) => {
    event.preventDefault();
    console.log("back button pressed");
  };

  return (
    <div className="playlist-page-container">
      <div className="playlist-page-content">
        <h1>Interval Playlist Maker</h1>
        <section>
          <h3>Whoops, something went wrong</h3>
          <p>
            It seems like your playlist could not be made.
            <br />
            Go back to the home page and try again!
          </p>
          <img src={sad_face} width={250} height={250} className="sad-face-img"/>
        </section>

        <button className="playlist-back-btn" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}
