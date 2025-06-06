interface Props{
  onEditInputChange: (e: React.FormEvent<HTMLInputElement>)=>void
  onEditSubmit: (e: React.FormEvent)=>void
}


const EditCollectionModal: React.FC<Props> = ({ onEditInputChange, onEditSubmit }) => {
  return (
    <>
      <form onSubmit={onEditSubmit}>
        <label>Edit Collection Name:</label>
        <input
          type="text"
          className="border-2 border-black p-2"
          onChange={onEditInputChange}
          placeholder="new collection name"
        ></input>
        <button></button>
      </form>
    </>
  )
}

export default EditCollectionModal
