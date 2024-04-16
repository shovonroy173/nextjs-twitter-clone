import React, { useCallback, useState } from 'react'
import Modal from '../Modal'
import Input from '../Input'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'

const LoginModal = () => {
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("");
    const [loading , setLoading] = useState(false);

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const onSubmit = useCallback(async()=>{
        try {
            setLoading(true);
            
            await signIn( "credentials", { email , password }) ;

            toast.success("Logged in successfully!!");

            loginModal.onClose();
        } catch (error) {
            console.log(error);
          toast.error("Something went wrong!!")  
        } finally{
          setLoading(false);
        }
    } , [loginModal , setLoading   , email , password]);
    
    const bodyContent = (
        <div className="flex flex-col gap-4">
          <Input 
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={loading}  
          />
          <Input 
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={loading} 
          />
        </div>
      );
      
  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])


      const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
          <p>First time using Twitter?
            <span 
              onClick={onToggle} 
              className="
                text-white 
                cursor-pointer 
                hover:underline
              "
              > Create an account</span>
          </p>
        </div>
      )
  return (
    <div>
        <Modal 
         disabled={loading}
         isOpen={loginModal.isOpen}
         title="Login"
         actionLabel="Sign in"
         onClose={loginModal.onClose}
         onSubmit={onSubmit}
         body={bodyContent}
        footer={footerContent}
        />
    </div>
  )
}

export default LoginModal