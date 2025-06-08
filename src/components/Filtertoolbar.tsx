import { useState } from "react"

interface Props {
  onPhraseChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCenturyChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const Filtertoolbar: React.FC<Props> = ({ onPhraseChange, onCenturyChange, onSubmit }) => {

  const [century, setCentury] = useState(1)
  var centuries = [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
    '13th',
    '14th',
    '15th',
    '16th',
    '17th',
    '18th',
    '19th',
    '20th',
    '21st',
  ]


  return (
    <menu className="w-screen min-h-20 bg-MintGreen border-RoseQuartz border-b-2 border-solid ">
      <h2 className="p-2 font-semibold">Filter</h2>
      <form onSubmit={onSubmit} className="flex flex-row p-2 gap-2">
        <label className="p-2" htmlFor="text-search">
          Text Search:
        </label>
        <input
          type="text"
          className="border-black border-2 p-1 rounded-sm"
          onChange={(e) => onPhraseChange(e)}
          placeholder="e.g., rome"
          id="text-search"
        />
        <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center">
          <label htmlFor="century-slider" className="font-semibold">
            Century:
          </label>
          <input
            type="range"
            id="century-slider"
            min="1"
            max="21"
            value={century}
            onChange={(e) => {setCentury(Number(e.target.value))
              onCenturyChange(e)}
            }
            className="w-64"
          />
          <span className="text-sm">{centuries[century-1]} Century</span>
        </div>
       
        <button type="submit" className="p-1 border-black border-2 rounded-sm">
          Search
        </button>
      </form>
    </menu>
  )
}

export default Filtertoolbar
