import { useRecommendationPager } from "../../data/RecommendationPager";
import { RecommendationType } from "../../utils/constants";
import { ItemSelectionRecommendationProps, SelectionCardProps } from "../../utils/types";
import right_arrow from "../../assets/arrow-icon-right.png";
import left_arrow from "../../assets/arrow-icon-left.png";

export default function TrackSelectionRecommendation(
  props: ItemSelectionRecommendationProps
) {
  const { data, hasNextPage, hasPreviousPage, goToNextPage, goToPreviousPage } = useRecommendationPager(RecommendationType.TRACKS);

  return (
    <section className="selection-recommendations">
      <h3>Some of your favorites</h3>
      <div className="rec-cards-pager-container">
        <img className={`change-page-btn ${hasPreviousPage() ? '' : 'hidden'}`} src={left_arrow} width={36} height={36} onClick={goToPreviousPage}/>

        <section className="rec-cards-container">
          {data.currentPage == null || data.currentPage.length == 0 ? (
            <h3>Loading...</h3>
          ) : (
            data.currentPage.map(
              (track, index) =>
                index < 8 && (
                  <TrackSelectionCard 
                    key={track.id}
                    data={track}
                    selected={props.selectedItems.some((item) => item.id === track.id)}
                    onSelected={props.handleItemClick} />
                )
            )
          )}
        </section>

        <img className={`change-page-btn ${hasNextPage() ? '' : 'hidden'}`} src={right_arrow} width={36} height={36} onClick={goToNextPage}/>
      </div>
    </section>
  );
}

const TrackSelectionCard = ({data, selected, onSelected}: SelectionCardProps) => {
  return (
    <span
      className={
        "rec-card-container" + (selected ? " selected" : "")
      }
      key={data.name + "_card"}
      onClick={() => {
        onSelected(data);
      }}
    >
      <img
        className="rec-item-img"
        src={
          data.album.images.length > 0
            ? data.album.images[0].url
            : ""
        }
        alt={`${data.name}`}
      />
      <p className="rec-item-text">{data.name}</p>
    </span>
  )
}