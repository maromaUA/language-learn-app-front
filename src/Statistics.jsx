export const Statistics = ({ mistakes, restart, nextLevel}) =>{
console.log(mistakes)
 
    return(
        <div className='flex flex-col gap-2 text-2xl md:text-3xl lg:text-4xl text-gray-200'>
    {mistakes.length==0 ? 'Well done! 0 mistakes':"Problem words:"}
    <ul className="flex flex-col gap-2">
      {mistakes.length>0 && mistakes.map(mistake=><li key={mistake}>{mistake}</li>)}
    </ul>
    <div className="flex gap-5 mt-4">
      <button onClick={restart}
             
              className='bg-[#93D334] text-2xl font-bold text-gray-900 px-4 py-2 rounded-md shadow-md hover:bg-gray-500 transition'
            >
              Try again 
            </button>
        <button
              onClick={nextLevel}
              className='bg-[#93D334] text-2xl font-bold text-gray-900 px-4 py-2 rounded-md shadow-md hover:bg-gray-500 transition'
            >
              Next level 
            </button>
    </div>
  </div>
    )
}