import '@picocss/pico';
import { useState } from 'react';
import styled from 'styled-components';  
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth"; 

const H1 = styled.h1`
    color: #ff9500;
    margin-top: 10%;
    font-size: 50px;
    a {
        text-decoration: none;
    }
`;
const H2 = styled.h2`
    color: #ff9500;
    margin-bottom: 10%;
`;
const Form = styled.form`
    width: 100%;
    color: #ff9500;
`;
const Label = styled.label`
    float: left;
`;
const Input = styled.input`
    border-color: #ff9500;
`;
const Div = styled.div`
    display: flex;
    flex-direction: column;
`;
const A = styled.a`
    color: #ff9500;
    margin-bottom: 1%;
    &.find {
        float: right;
    }
`;
const Button = styled.button`
    margin-top: 1%;
    background-color: #ff9500;
    border-color: #ff9500;
`;

export default function Login() {
  const navigate=useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // 홈화면으로 이동시킴
    } catch (e) {
      if(e instanceof FirebaseError){
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }; 

  return(
      <>
          <H1><A href='/'> One Day Wonder </A></H1>
          <H2> 로그인 </H2>
          <Form onSubmit={onSubmit}>
              <Label htmlFor="email"> Email </Label>
                  <Input onChange={onChange} type='email' id="email" name="email" value={email} placeholder='Email' required />
                  
              <Label htmlFor="password"> Password </Label>
                  <Input onChange={onChange} type='password' id="password" name="password" value={password} placeholder='Password' required />
              <Div>
                  <A href='#' className='secondary find'> 이메일/비밀번호 찾기 </A>
                  <A href='/create-account' className='secondary'> 회원가입 하러가기 </A>
              </Div>
              <Button type='submit' value={isLoading ? "Loading..." : "Log In"} >로그인</Button>
                  
          </Form>
      </>
  );
}