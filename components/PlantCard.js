export default function PlantCard({plantImageLink, plantName, waterFreq, tip}){
    return(
        <div className="bg-white border shadow-sm sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
  <div className="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
    <img className=" absolute top-0 start-0 object-cover" src={plantImageLink} alt={plantName} />
  </div>
  <div className="flex flex-wrap">
    <div className="p-4 flex flex-col h-full sm:p-7">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {plantName}
      </h3>
      <p className="mt-1 text-gray-500 dark:text-neutral-400">
        {tip}
      </p>
      <div className="mt-5 sm:mt-auto">
        <p className="text-xs text-gray-500 dark:text-neutral-500">
          {waterFreq}
        </p>
      </div>
    </div>
  </div>
</div>
    )
}