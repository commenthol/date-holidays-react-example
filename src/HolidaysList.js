import React, { useState } from "react";
import Holidays from 'date-holidays'

const code = language => language.toLowerCase().split('-')[0]

/**
 * tries to map browser language with holidays lang.
 */
const selectLanguage = (languages) => {
  const mainlanguages = languages.map(code)

  for (let navlang of navigator.languages) {
    const l = navlang.toLowerCase()
    const i = languages.indexOf(l)
    if (i !== -1) {
      return languages[i]
    }
    const j = mainlanguages.indexOf(code(l));
    if (j !== -1) {
      return languages[j];
    }
  }
  return languages[0]
}

export function HolidaysList () {
  const [country, setCountry] = useState('IT')

  const hd = new Holidays(country);
  const countries = hd.getCountries('en');

  const language = selectLanguage(hd.getLanguages())
  hd.setLanguages(language)

  const list = hd.getHolidays();

  return (
    <>
      <SelectCountry country={country} countries={countries} setCountry={setCountry} />
      <table className="holidays">
        <thead>
          <tr>
            <th>date</th>
            <th>name</th>
            <th>type</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, key) => Row({...item, key}))}
        </tbody>
      </table>
    </>
  )
}

function Row ({key, date, name, type}) {
  return (
    <tr key={key}>
      <td>{date}</td>
      <td>{name}</td>
      <td>{type}</td>
    </tr>
  )
}

function SelectCountry ({ country, countries, setCountry }) {
  return (
    <select value={country} onChange={(ev) => setCountry(ev.target.value)}>
      {Object.entries(countries).map(([code, name], key) => (
        <option key={key} value={code}>
          {name}
        </option>
      ))}
    </select>
  )
}