export default function Card() {
    return (<div className="w-full flex gap-2 font-xl rounded-md text-black">
        <div
            onClick={() => handleCheckboxChange(student.id)}
            className={`w-1/6 flex items-center justify-center px-5 ${student.checked ? "bg-green-400" : "bg-red-400"
                } rounded-md`}
        >
            {student.waiting ? (
                <ArrowPathIcon className="animate-spin" />
            ) : student.checked ? (
                <CheckIcon />
            ) : (
                <XMarkIcon />
            )}
        </div>
        <div className="w-2/3 h-16 bg-orange-200 rounded-md flex flex-col justify-start items-start overflow-hidden p-2 text-lg">
            {student.name}
            <span className="text-sm text-slate-900">
                {student.occupation}
            </span>
        </div>
        <div
            className={`w-1/6 h-16 ${student.zone == 1
                ? "bg-white"
                : student.zone == 2
                    ? "bg-blue-400"
                    : "bg-yellow-400"
                } rounded-md flex justify-center items-center text-2xl`}
        >
            {student.zone}
        </div>
    </div>)
}