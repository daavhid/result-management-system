import { EmailTemplate,  EmailTemplate2 } from '@/components/emailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetToken = async (email:string,token:string) => {
    await resend.emails.send({
        from: 'Resulx <onboarding@resend.dev>',
        to: [`${email}`],
        subject: 'Reset Password',
        react: EmailTemplate({ token: token}),
      });
    
}
export const sendVerificationToken = async (email:string,token:string) => {
    await resend.emails.send({
        from: 'Resulx  <onboarding@resend.dev>',
        to: [`${email}`],
        subject: 'Verify Email Address',
        react: EmailTemplate2({ token: token}),
      });
    
}