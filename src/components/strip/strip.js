import React from 'react'
import { Button, Link } from "@mui/material";

const Strip = () => {
    return (
        <div className='fir w-[100%] px-5 py-3 bg-orange-500 text-[white] flex justify-between items-center'>
            Please continue registration
            <Link href='/'>
                <Button variant="contained">
                    <span className="fim capitalize">Continue</span>
                </Button>
            </Link>
        </div>
    )
}

export default Strip