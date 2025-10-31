export const Button = ({action, title, mistake=false}) => {
 return  <button
            onClick={action}
            className={` ${mistake ? "bg-red-500": "bg-lime-500"} text-2xl font-bold mt-2 text-gray-900 px-4 py-2 rounded-md shadow-md hover:bg-gray-500 transition`}
          >
            {title}
          </button>
}