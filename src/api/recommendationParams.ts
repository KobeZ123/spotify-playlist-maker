class TrackAttribute {
    min: number;
    max: number;
    target: boolean;

    constructor(value: number);
    constructor(min: number, max: number);
    constructor(valueOrMin: number, max?: number) {
        if (max === undefined) {
            this.min = valueOrMin;
            this.max = valueOrMin;
            this.target = true;
        } else {
            this.min = valueOrMin;
            this.max = max;
            this.target = false;
        }
    }
}


class RecommendationParams {
    traits: object;

    constructor() {
        this.traits = {}
    }

    addAcousticness(attribute: TrackAttribute) {

    }

    addDancability(attribute: TrackAttribute) {
        
    }




}