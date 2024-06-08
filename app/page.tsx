import Image from "next/image";
import DatePiker from "@/stories/components/datepiker";

export default function Home() {

  return (
    <div>
      <DatePiker calendar={'persian'} inputDate={true} datePiker={true} disablePastDays={true} setValue={()=>{}}/>
    </div>
  );
}
