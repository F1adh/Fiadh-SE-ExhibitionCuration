interface Props{
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>)=>void
    onSubmit: (e: React.FormEvent<HTMLFormElement>)=>void
}


const Filtertoolbar: React.FC<Props> = ({onInputChange, onSubmit}) => {
  /*var centuries = [
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
*/
  

  return (
    <menu className="w-screen min-h-20 bg-MintGreen border-RoseQuartz border-b-2 border-solid ">
      <h2 className="p-2 font-semibold">Filter</h2>
      <form onSubmit={onSubmit} className="flex flex-row p-2 gap-2">
        <label className='p-2' htmlFor='text-search'>Text Search:</label>
        <input
          type="text"
          className="border-black border-2 p-1 rounded-sm"
          onChange={(e)=> onInputChange(e)}
          placeholder="e.g., rome"
          id='text-search'
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
        <button type="submit" className="p-1 border-black border-2 rounded-sm">Search</button>
      </form>
    </menu>
  )
}

export default Filtertoolbar
