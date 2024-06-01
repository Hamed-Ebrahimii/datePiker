interface DayProps  {
    day : number
}
const Day = ({day} : DayProps) =>{
    return (
        <div className="w-full flex items-center justify-center">
                {
                    day
                }
        </div>
    )
}
export default Day