import "../style/AmericasNav.css"

export default function AmericasNav({
  onRegionChange,
  onHomeClick,
  isCountrySelected,
}) {
  const handleRegionClick = (region) => {
    onRegionChange(region);
  };
  return (
    <>
      <nav className="bg-dark nav-menu d-flex align-items-center">
        <ul className="d-flex justify-content-center align-items-center w-100">
          {isCountrySelected && (
            <li className="nav-li">
              <a
                className="nav-link text-white fw-bold"
                href="#"
                onClick={onHomeClick}
              >
                Home
              </a>
            </li>
          )}
          <li className="nav-li">
            <a
              className="nav-link text-white fw-bold"
              href="#"
              onClick={() => handleRegionClick("North America")}
            >
              América del Norte
            </a>
          </li>
          <li className="nav-li">
            <a
              className="nav-link text-white fw-bold"
              href="#"
              onClick={() => handleRegionClick("South America")}
            >
              América del sur
            </a>
          </li>
          <li className="nav-li">
            <a
              className="nav-link text-white fw-bold"
              href="#"
              onClick={() => handleRegionClick("Central America")}
            >
              América Central
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}