import * as React from 'react';

interface EmailTemplateProps {

  token:string
}

export const EmailTemplate = ({token }: EmailTemplateProps)=>{
    const resetLink = `http://localhost:3000/new-password?token=${token}`
    return(
        <div>
            <h1>Click <a href={`${resetLink}`}>here</a> to reset Password</h1>
        </div>
    )
}

export const EmailTemplate2 = ({token }: EmailTemplateProps)=>{
    const verifyLink = `http://localhost:3000/verification?token=${token}`
    return(
        <div>
            <h1 className='text-xl'>Click <a href={`${verifyLink}`}>here</a> to verify Email Address</h1>
        </div>
    )
}



