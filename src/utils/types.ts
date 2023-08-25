export interface TopItemDisplayProps {
  setTokenExpired: (value: boolean) => void;
}

export interface ItemSelectionRecommendationProps {
  topItemsList: any[];
  selectedItems: any[];
  handleItemClick: (artist: any) => void;
}

// handles when a card or slip item is clicked 
export interface ItemSelectProps {
  data: any;
  handleClick: (data: any) => void;
}

// interface for a selection card 
export interface SelectionCardProps {
  data: any;
  selected: boolean;
  onSelected: (data: any) => void;
}

export interface SearchBarProps {
  handleItemClick: (data: any) => void;
}
