import oilChange from "./oil_change.png"
import carSale from "./car_sale.png"

function MainPage() {
  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "2rem"}}>
      <div style={{width: "65%"}} className="text-center">
        <h1 style={{fontSize: "5rem", fontFamily: "Playfair Display"}} className="">Motor Empire</h1>
        <div className="">
          <p style={{fontSize: "1.5rem"}} className="">
            The premiere solution for automobile dealership
            management!
          </p>
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
        <section style={{marginTop: "5rem"}}>
          <div className="section1-container">
            <div>
              <img style={{cover: "true", overflow: "hidden"}} width={"500px"} height={"250px"} src={carSale}/>
            </div>
            <div style={{ alignItems: 'center', display: "flex", flexDirection: "column", justifyContent: "center"}}>
              <h4>Boost and track your car sales</h4>
              <h4> effortlessly</h4>
              <button type="submit" className="call-to-action">Get Started</button>
            </div>
          </div>
        </section>
        <section style={{marginTop: "8rem"}}>
          <div className="section2-container">
            <div>
              <img width={"350px"} src={oilChange}/>
            </div>
            <div style={{ alignItems: 'center', display: "flex", flexDirection: "column", justifyContent: "center"}}>
              <h4>Maximize auto services sales</h4>
              <h4>through our user-friendly dashboard</h4>
              <button  type="submit" className="call-to-action">Get Started</button>
            </div>
          </div>
        </section>
        </div>
      </div>
    </div>

  );
}

export default MainPage;
