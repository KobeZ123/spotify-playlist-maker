import ContentLoader from 'react-content-loader'
import "../../styles/playlist_maker.css"

export const LoadingSelectionCardPlaceholder = () => {
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