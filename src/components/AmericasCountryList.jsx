import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CountryDetails from "./CountryDetails";

export default function AmericasCountryList({
  region,
  onCountrySelect,
  selectedCountry,
}) {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/subregion/${region}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
      
        if (!data || data.length === 0) {
          setError(`No se encontraron países para ${region}`);
          setCountries([]);
          return;
        }
        const countryList = data.map((country, index) => ({
          id: index,
          name: country.name.common,
          capital: country.capital ? country.capital[0] : "No disponible",
          language: country.languages
            ? Object.values(country.languages)[0]
            : "No disponible",
          code: country.cca3, // Código alpha-3 para CountryDetails
          flag: country.flags?.png || "No disponible", // URL de la bandera
        }));
        setCountries(countryList);
        setError(null);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(error.message);
        setCountries([]);
      }
    };
    fetchCountries();
  }, [region]);

  return (
    <>
      <div className="container my-4">
        {selectedCountry ? (
          <CountryDetails countryCode={selectedCountry.code} />
        ) : (
          <div>
            <h1 className="mb-4">
              Países de{" "}
              {{
                "North America": "América del Norte",
                "South America": "América del Sur",
                "Central America": "América Central",
              }[region] || "Región no especificada"}
            </h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex flex-wrap gap-3">
              {countries.map((country) => (
                <div
                  key={country.id}
                  className="card bg-white shadow-sm"
                  style={{ width: "18rem" }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      {country.flag !== "No disponible" ? (
                        <img
                          src={country.flag}
                          alt={`Bandera de ${country.name}`}
                          className="me-2"
                          style={{
                            width: "24px",
                            height: "16px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span className="me-2">🏳️</span>
                      )}
                      <h5 className="card-title mb-0">{country.name}</h5>
                    </div>
                    <p className="card-text">
                      <strong>Capital:</strong> {country.capital}
                    </p>
                    <p className="card-text">
                      <strong>Idioma:</strong> {country.language}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => onCountrySelect(country)}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
