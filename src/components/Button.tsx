import * as React from "react";

export default (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (<button {...props} className={`mb-1 border border-black hover:bg-gray-100 active:bg-white ${props.className || ''}`}>{props.children}</button>)
}