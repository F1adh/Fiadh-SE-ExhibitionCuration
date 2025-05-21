interface Props{
    onInputChange: (e)=>void
    onSubmit: (e)=>void
}


const Filtertoolbar: React.FC<Props> = ({onInputChange, onSubmit}) => {
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
    <menu className="w-screen min-h-20 bg-MintGreen border-black border-solid">
      <h2>Filter</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="border-black border-2"
          onChange={(e)=> onInputChange(e)}
        />
        {/*
        <select onChange={onSelectChange}>
          {centuries.map((century, index: number) => {
            return (
              <option key={index} value={centuries[index]}>
                {century + ' century'}
              </option>
            )
          })}
        </select>
        <input type="text" className="border-black border-2" onChange={onInputChange} />
        */}
        <button type="submit">Search</button>
      </form>
    </menu>
  )
}

export default Filtertoolbar
