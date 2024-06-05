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
export const Input = ({icon , onBlur , onChange , onFocus ,  onClick ,  placeholder , value , className , style } : InputProps) =>{
    return (
        <div  className={className} style={style}>
                <input onClick={onClick} className="text-sm text-gray-400 font-medium bg-inherit border-none placeholder:text-white  outline-none" placeholder={placeholder} value={value}/>
                {
                    icon && icon
                }
                
        </div>
    )
}