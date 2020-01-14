import Nav from "../Nav/Nav.component";

const Header = () => (
  <div>
    <div className="bar">
      <a href="/">Eggy</a>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </div>
);

export default Header;
