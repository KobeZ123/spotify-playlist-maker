export interface TopItemDisplayProps {
  setTokenExpired: (value: boolean) => void;
}

export interface ItemSelectionRecommendationProps {
  topItemsList: any[];
  selectedItems: any[];
  handleItemClick: (event: any, artist: any) => void;
}

export interface ItemSelectProps {
  data: any;
  handleClick: (event: any, data: any) => void;
}
