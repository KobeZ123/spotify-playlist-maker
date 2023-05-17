import "../styles/interval_selector.css";

export default function TestIntervalSelector() {
    return (
        <div className="interval-selector-container">
            <section className="bound-section-container">
                <p className="section-label">Lower bound duration (minutes and seconds)</p>
                <section className="bound-input-section"> 
                    <span className="bound-input-span">
                        <input className="input-number" type="number"/>
                        <p className="unit-label">minutes</p>
                    </span>
                    <span className="bound-input-span">
                        <input className="input-number" type="number"/>
                        <p className="unit-label">seconds</p>
                    </span>
                </section>
                
                
            </section>
            <section className="bound-section-container">
                <p className="section-label">Upper bound duration (minutes and seconds)</p>
                <section className="bound-input-section"> 
                    <span className="bound-input-span">
                        <input className="input-number" type="number"/>
                        <p className="unit-label">minutes</p>
                    </span>
                    <span className="bound-input-span">
                        <input className="input-number" type="number"/>
                        <p className="unit-label">seconds</p>
                    </span>
                </section>
                
            </section>
            <button className="interval-submit-btn">SUBMIT</button>
            
        </div>
    );
}