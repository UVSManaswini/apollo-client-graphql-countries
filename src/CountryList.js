import React, { useState } from 'react';
import { useQuery, Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
    }
  }
`;

const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      name
      native
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

const CountryList = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleDetailsClick = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <>
            <ul>
              {data.countries.map((country) => (
                <li key={country.code}>
                  {country.name}
                  <button onClick={() => handleDetailsClick(country.code)}>Details</button>
                </li>
              ))}
            </ul>

      {selectedCountry && (
        <Query query={GET_COUNTRY_DETAILS} variables={{ code: selectedCountry }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading country details...</p>;
            if (error) return <p>Error: {error.message}</p>;

            const country = data.country;
            return (
              <div>
                <h2>Country Details</h2>
                <p>Name: {country.name}</p>
                <p>Native: {country.native}</p>
                <p>Emoji: {country.emoji}</p>
                <p>Currency: {country.currency}</p>
                <p>Languages:</p>
                <ul>
                  {country.languages.map((language) => (
                    <li key={language.code}>
                      Code: {language.code}, Name: {language.name}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setSelectedCountry(null)}>Close</button>
              </div>
            );
          }}
        </Query>
      )}
    </>
  );
};

export default CountryList;
