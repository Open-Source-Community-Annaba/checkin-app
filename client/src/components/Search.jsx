export default function Search() {
  return (
    <div className="absolute top-16 bottom-0 overflow-scroll w-full bg-slate-700">
      <div className="flex justify-start items-center h-24 p-5">
        <label
          className="w-1/4 h-12 flex justify-start items-center font-3xl font-bold uppercase"
          htmlFor="name"
        >
          search:
        </label>
        <input
          className="px-5 w-3/4 h-10 bg-transparent focus:outline-0 border-2 border-white rounded-full"
          type="text"
          id="name"
          placeholder="type here..."
          onChange={(e) => {
            updateValue(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-5">
        <div className="w-full flex gap-2 font-xl rounded-md text-white text-sm font-bold">
          <div className={`w-1/6 h-12 flex items-center justify-center`}>
            Checked
          </div>
          <div className="w-2/3 h-12 flex justify-center items-center ">
            name
          </div>
          <div className={`w-1/6 h-12 flex justify-center items-center`}>
            Zone
          </div>
        </div>

        {filtered.map((student, index) => (
          <div className="w-full flex gap-2 font-xl rounded-md text-black">
            <div
              onClick={() => handleCheckboxChange(student.id)}
              className={`w-1/6 flex items-center justify-center px-5 ${
                student.checked ? "bg-green-400" : "bg-red-400"
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
                {student.type} - {student.faculty}
              </span>
            </div>
            <div
              className={`w-1/6 h-16 ${
                student.zone == 1
                  ? "bg-white"
                  : student.zone == 2
                  ? "bg-blue-400"
                  : "bg-yellow-400"
              } rounded-md flex justify-center items-center text-2xl`}
            >
              {student.zone}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
