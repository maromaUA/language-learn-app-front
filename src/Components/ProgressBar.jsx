export const ProgressBar = ({progress}) => {

    return (
         <div className='w-full bg-[#38464F] rounded-full h-4 mb-10'>
        <div
          className='bg-[#93D334] h-4 rounded-full transition-all duration-300'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )
}