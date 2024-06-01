interface DayProps  {
    day : number
}
const Day = ({day} : DayProps) =>{
    return (
        <div className="w-full flex items-center justify-center">
                <p className="text-sm font-medium text-gray-400">
                {
                    day
                }
                </p>
        </div>
    )
}
export default Day