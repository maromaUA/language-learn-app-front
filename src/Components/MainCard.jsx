import { Button } from "./Button"
export const MainCard = ({answer, handleChange, level, currentArr, current, checkHandler}) => {
    return <div className='flex flex-col justify-center items-center gap-6'>
          <div className='text-lime-500 text-2xl font-bold'>LEVEL {level}</div>
          <h1 className='text-2xl font-semibold'>Translate a verb </h1>
          <div className='text-3xl font-bold'>{currentArr.length>0 && currentArr[current].verb}</div>

          <input
            type="text"
            value={answer}
            onChange={handleChange}
            className='border border-gray-200 rounded-md p-2 w-64 text-gray-200 text-2xl font-bold placeholder-gray-400 bg-transparent text-center'
            placeholder="Enter translation"
            autoFocus
          />
        <Button action={checkHandler} title={'Check'}/>
    </div>
}