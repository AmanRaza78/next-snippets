"use client"
import { Check, CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function CopyButton({code}:{code:string}){

    const [isCopied, setIsCopied] = useState(false)
    const handleCopy = async () => {
        try{
            await navigator.clipboard.writeText(code)
            setIsCopied(true)
            setTimeout(()=>setIsCopied(false), 2000)
        }
        catch(err){
            console.log("Failed to copy:",err)
        }

    } 

    return(
    <>
    <Button variant="outline" size="icon" onClick={handleCopy}>
        {isCopied ? (
            <Check className="w-4 h-4"/>
        ):(<CopyIcon className="w-4 h-4"/>)}
  
    </Button>
    </>
    )
}
