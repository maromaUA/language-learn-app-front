import { Button } from "./Button"

export const FeedBackMessage = ({feedback, currentArr, current, nextHandler}) => {
return (
     <div
                className={`bg-[#38464F] ${
                  feedback ? "text-lime-500" : "text-red-500"
                } text-2xl p-3 rounded-md text-center`}
              >
                <div>{currentArr.length>0 && feedback ? "✅ Exactly" : <span>❌ Right answer is <span className='font-bold'>{currentArr[current].translation[0]}</span></span>}</div>

                <Button action={nextHandler} title={feedback?"Continue":"Got it"} mistake={feedback?false:true}/>
              </div>
)
}