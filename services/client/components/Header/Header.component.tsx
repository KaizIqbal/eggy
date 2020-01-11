import Nav from "../Nav/Nav.component";

const Header = () => (
  <>
    <div className="bar">
      <a href="/">Eggy</a>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </>
);

export default Header;
