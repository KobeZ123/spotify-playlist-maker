import { useRecommendationPager } from "../../data/RecommendationPager";
import { ItemSelectionRecommendationProps, SelectionCardProps } from "../../utils/types";
import { RecommendationType } from "../../utils/constants";
import right_arrow from "../../assets/arrow-icon-right.png";
import left_arrow from "../../assets/arrow-icon-left.png";
import { useEffect } from "react";
import ContentLoader from 'react-content-loader'

export default function ArtistSelectionRecommendation(
  props: ItemSelectionRecommendationProps
) {
  const { data, hasNextPage, hasPreviousPage, goToNextPage, goToPreviousPage } = useRecommendationPager(RecommendationType.ARTISTS);

  useEffect(() => {
    console.log(data);
    console.log(hasPreviousPage());
    console.log(hasNextPage());
  }, [data]);

  return (
    <section className="selection-recommendations">
      <h3>Some of your favorites</h3>
      <div className="rec-cards-pager-container">
        <button className={`change-page-btn ${data.currentPage != null && hasPreviousPage() ? '' : 'hidden'}`} onClick={goToPreviousPage}>
          <img src={left_arrow} width={36} height={36} />
        </button>
        <section className="rec-cards-container">
          {data.currentPage == null || data.currentPage.length == 0 ? (
            Array.from({ length: 8 }, (_, i) => (
              <ArtistSelectionCardPlaceholder />
            ))
          ) : (
            data.currentPage.map(
              (artist, index) =>
                index < 8 && (
                  <ArtistSelectionCard 
                    key={artist.id}
                    data={artist} 
                    selected={props.selectedItems.some((item) => item.id === artist.id)}
                    onSelected={props.handleItemClick} />
                )
            )
          )}
        </section>
        
        <button className={`change-page-btn ${data.currentPage != null && hasNextPage() ? '' : 'hidden'}`} onClick={goToNextPage}>
          <img src={right_arrow} width={36} height={36}/>
        </button>
      </div>
    </section>
  );
}



const ArtistSelectionCard = ({data, selected, onSelected}: SelectionCardProps) => {
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
        src={data.images.length > 0 ? data.images[0].url : ""}
        alt={`${data.name}`}
      />
      <p className="rec-item-text">{data.name}</p>
    </span>
  )
}


const ArtistSelectionCardPlaceholder = () => {
  return (
    <>
      <ContentLoader 
        speed={2}
        width={288}
        height={320}
        viewBox="0 0 288 320"
        backgroundColor="#f5f5f5"
        foregroundColor="#dbdbdb"
        className="rec-card-loader-web"
      >
        <rect x="2.5rem" y="2rem" rx="1rem" ry="1rem" width="12rem" height="12rem" /> 
        <rect x="3.5rem" y="14.5rem" rx="0.5rem" ry="0.5rem" width="10rem" height="1.25rem" />
        <rect x="3.5rem" y="16rem" rx="0.5rem" ry="0.5rem" width="10rem" height="1.25rem" />
      </ContentLoader>
    
      <ContentLoader 
        speed={2}
        width={'max(100%, 250px)'}
        height={112}
        viewBox="0 0 100% 112"
        backgroundColor="#f5f5f5"
        foregroundColor="#dbdbdb"
        className="rec-card-loader-mobile"
      >
        <rect x="1.5rem" y="0.5rem" rx="1rem" ry="1rem" width="6rem" height="6rem" /> 
        <rect x="9rem" y="2rem" rx="0.5rem" ry="0.5rem" width="40%" height="1.25rem" />
        <rect x="9rem" y="4rem" rx="0.5rem" ry="0.5rem" width="40%" height="1.25rem" /> 
      </ContentLoader>
    </>
    
    // display === "web" ? (
    //   <ContentLoader 
    //     speed={2}
    //     width={288}
    //     height={320}
    //     viewBox="0 0 288 320"
    //     backgroundColor="#f5f5f5"
    //     foregroundColor="#dbdbdb"
    //     className="rec-card-loader-web"
    //   >
    //     <rect x="2.5rem" y="2rem" rx="1rem" ry="1rem" width="12rem" height="12rem" /> 
    //     <rect x="3.5rem" y="14.5rem" rx="0.5rem" ry="0.5rem" width="10rem" height="1.25rem" />
    //     <rect x="3.5rem" y="16rem" rx="0.5rem" ry="0.5rem" width="10rem" height="1.25rem" />
    //   </ContentLoader>
    // ) : (
    //   <ContentLoader 
    //     speed={2}
    //     width={'100%'}
    //     height={112}
    //     viewBox="0 0 100% 112"
    //     backgroundColor="#f5f5f5"
    //     foregroundColor="#dbdbdb"
    //     className="rec-card-loader-mobile"
    //   >
    //     <rect x="1.5rem" y="0.5rem" rx="1rem" ry="1rem" width="6rem" height="6rem" /> 
    //     <rect x="40%" y="2rem" rx="0.5rem" ry="0.5rem" width="50%" height="1.25rem" />
    //     <rect x="40%" y="4rem" rx="0.5rem" ry="0.5rem" width="50%" height="1.25rem" /> 
    //   </ContentLoader>
    // )
// design graveyard 
//  <ContentLoader 
//     speed={2}
//     width={'100%'}
//     height={112}
//     viewBox="0 0 100% 112"
//     backgroundColor="#f5f5f5"
//     foregroundColor="#dbdbdb"
//   >
 
//     <rect x="1.5rem" y="0.5rem" rx="1rem" ry="1rem" width="6rem" height="6rem" /> 
//     <rect x="40%" y="2rem" rx="0.5rem" ry="0.5rem" width="50%" height="1.25rem" />
//     <rect x="40%" y="4rem" rx="0.5rem" ry="0.5rem" width="50%" height="1.25rem" />
//   </ContentLoader>
//   <ContentLoader 
//     speed={2}
//     width={386}
//     height={144}
//     viewBox="0 0 386 144"
//     backgroundColor="#f5f5f5"
//     foregroundColor="#dbdbdb">
//     <rect x="0" y="0" rx="1rem" ry="1rem" width="8rem" height="8rem" /> 
//     <rect x="9rem" y="2.5rem" rx="0.5rem" ry="0.5rem" width="10rem" height="1.25rem" />
//     <rect x="9rem" y="4.5rem" rx="0.5rem" ry="0.5rem" width="10rem" height="1.25rem" />
//   </ContentLoader> 

//   <ContentLoader 
//     speed={2}
//     width={400}
//     height={400}
//     viewBox="0 0 400 400"
//     backgroundColor="#f3f3f3"
//     foregroundColor="#ecebeb">
//       <rect x="0" y="0" rx="1rem" ry="1rem" width="12rem" height="12rem" />
//   </ContentLoader>

  );
}