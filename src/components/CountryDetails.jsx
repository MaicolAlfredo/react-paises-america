import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CountryDetails({ countryCode }) {
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);
    const [isMapLoading, setIsMapLoading] = useState(true);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const response = await fetch(
                    `https://restcountries.com/v3.1/alpha/${countryCode}`,
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
                console.log(data);
                if (!data || data.length === 0) {
                    throw new Error("No se encontraron detalles del país");
                }
                // Tomamos el primer objeto del array (la API devuelve un array con un solo país)
                const countryData = data[0];
                setCountry({
                    name: countryData.name.common,
                    flag: countryData.flags?.png || "No disponible",
                    coatOfArms: countryData.coatOfArms?.png || "No disponible",
                    capital: countryData.capital
                        ? countryData.capital[0]
                        : "No disponible",
                    population: countryData.population
                        ? countryData.population.toLocaleString()
                        : "No disponible",
                    language: countryData.languages
                        ? Object.values(countryData.languages).map((lang) => lang.trim())
                        : "No disponible",
                    currency: countryData.currencies
                        ? Object.values(countryData.currencies)[0].name
                        : "No disponible",
                    latlng: countryData.latlng || [0, 0],
                    borders:
                        countryData.borders && countryData.borders.length > 0
                            ? countryData.borders
                            : ["Ninguna"],
                });
                setError(null);
            } catch (error) {
                console.error("Error fetching country details:", error);
                setError(error.message);
                setCountry(null);
            }
        };
        fetchCountryDetails();
    }, [countryCode]);

    const handleMapLoad = () => {
        setIsMapLoading(false);
    };

    if (error) {
        return (
            <div className="container my-4">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    if (!country) {
        return (
            <div className="container my-4">
                <div className="alert alert-info">Cargando detalles del país...</div>
            </div>
        );
    }

    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${country.latlng[1] - 10
        },${country.latlng[0] - 10},${country.latlng[1] + 10},${country.latlng[0] + 10
        }&layer=mapnik`;

    return (
        <>
            <div className="container my-4">
                <h2 className="mb-4">{country.name}</h2>
                <div className="card bg-white shadow-sm">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <img
                                    src={country.flag}
                                    alt={`Bandera de ${country.name}`}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: "150px" }}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <img
                                    src={country.coatOfArms}
                                    alt={`Escudo de ${country.name}`}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: "150px" }}
                                />
                            </div>
                        </div>
                        <div className="mb-3 position-relative">
                            {isMapLoading && (
                                <div
                                    className="alert alert-info text-center w-100 mb-0"
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    Cargando Mapa...
                                </div>
                            )}
                            <iframe
                                title={`Mapa de ${country.name}`}
                                src={mapUrl}
                                className="w-100 rounded country-map"
                                style={{ border: "none" }}
                                onLoad={handleMapLoad}
                            />
                        </div>
                        <p className="card-text">
                            <strong>Capital:</strong> {country.capital}
                        </p>
                        <p className="card-text">
                            <strong>Población:</strong> {country.population}
                        </p>
                        <p className="card-text">
                            <strong>Idioma:</strong> {country.language.join(", ")}
                        </p>
                        <p className="card-text">
                            <strong>Moneda:</strong> {country.currency}
                        </p>
                        <p className="card-text">
                            <strong>Fronteras:</strong> {country.borders.join(", ")}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
