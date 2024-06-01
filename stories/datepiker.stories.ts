import { Meta, StoryObj } from "@storybook/react";
import DatePiker from "./components/datepiker";
import "../app/globals.css"
const meta : Meta<typeof DatePiker> = {
    component : DatePiker,
    title : "DatePiker"
}
export default meta;
type Story = StoryObj<typeof meta>;
export const DatePikerPersian : Story = {
    args : {
        calendar : 'persian',
        inputDate : true
    }
} 