import React, { useCallback, useState } from 'react'
import Modal from '../Modal'
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import Input from '../Input';
import axios from "axios";
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
  
    const [loading , setLoading] = useState(false);

    
  
    const onToggle = useCallback(() => {
        if (loading) {
          return;
        }
      
        registerModal.onClose();
        loginModal.onOpen();
      }, [loginModal, registerModal, loading]);

      const onSubmit = useCallback(async () => {
        try {
          setLoading(true);
          await axios.post("/api/register" , {
            email , password , username , name
          });

          toast.success("Account created successfully!!");

          await signIn("credentials" , {email , password
          });

          registerModal.onClose();
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong!!")
        } finally {
          setLoading(false);
        }

      }, [ registerModal , email , password , username , name ]);

      const bodyContent = (
        <div className="flex flex-col gap-4">
          <Input
            disabled={loading}
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            disabled={loading}
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <Input 
            disabled={loading}
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input 
            disabled={loading}
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      );

      const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
          <p>Already have an account?
            <span 
              onClick={onToggle} 
              className="
                text-white 
                cursor-pointer 
                hover:underline
              "
              > Sign in</span>
          </p>
        </div>
      );
    
    return (
    
        <Modal
        disabled={loading}
        isOpen={registerModal.isOpen}
        title="Create an account"
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
  )
}

export default RegisterModal