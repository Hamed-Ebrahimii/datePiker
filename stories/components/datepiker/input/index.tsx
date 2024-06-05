import { HTMLAttributes, ReactNode } from "react"
import "../../../../app/globals.css"
interface InputProps extends HTMLAttributes<HTMLInputElement> {
    icon?: ReactNode,
    placeholder?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
}
export const Input = ({icon , onBlur , onChange , onFocus ,  onClick ,  placeholder , value} : InputProps) =>{
    return (
        <div  className="w-48 py-2 px-1 border-2 rounded-md flex items-center justify-between border border-white my-4 bg-white ">
                <input onClick={onClick} className="text-sm text-gray-400 font-medium bg-inherit border-none placeholder:text-white  outline-none" placeholder={placeholder} value={value}/>
                {
                    icon && icon
                }
                
        </div>
    )
}